#!/usr/bin/env node
// Translate all posts from Chinese to English using Claude API
// Usage: ANTHROPIC_API_KEY=sk-xxx SUPABASE_SERVICE_KEY=xxx node scripts/translate-posts.js
//
// Prerequisites:
// 1. Supabase posts table must have title_en, summary_en, content_en columns
// 2. ANTHROPIC_API_KEY env var (Claude API key)
// 3. SUPABASE_SERVICE_KEY env var (service_role key for writing)

const SB_URL = 'https://kszbdgfbihnawjgmwjlk.supabase.co';
const SB_ANON_KEY = 'sb_publishable_VrgzauRQ_kV_2MD0ujZ39w_0KREni_f';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!ANTHROPIC_API_KEY) { console.error('Missing ANTHROPIC_API_KEY'); process.exit(1); }
if (!SB_SERVICE_KEY) { console.error('Missing SUPABASE_SERVICE_KEY'); process.exit(1); }

const SYSTEM_PROMPT = `You are a professional translator specializing in AI/tech content. Translate the following Traditional Chinese text to English.

Rules:
- Preserve ALL Markdown formatting (headers, lists, tables, links, bold, italic, code blocks)
- Preserve ALL emoji characters exactly as-is
- Keep proper nouns (company names, product names, people names) in their original form
- Keep URLs unchanged
- Translate naturally, not word-by-word
- For Taiwan-specific context, add brief clarifications if needed
- Output ONLY the translated text, no explanations`;

async function translate(text) {
  if (!text || !text.trim()) return '';

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: text }]
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

async function fetchAllPosts() {
  const res = await fetch(`${SB_URL}/rest/v1/posts?select=id,date,type,title,summary,content,title_en,summary_en,content_en&order=date.desc`, {
    headers: { 'apikey': SB_ANON_KEY, 'Authorization': `Bearer ${SB_ANON_KEY}` }
  });
  return res.json();
}

async function updatePost(id, fields) {
  const res = await fetch(`${SB_URL}/rest/v1/posts?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SB_SERVICE_KEY,
      'Authorization': `Bearer ${SB_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(fields)
  });
  if (!res.ok) throw new Error(`Supabase PATCH error ${res.status}: ${await res.text()}`);
}

async function main() {
  console.log('Fetching posts...');
  const posts = await fetchAllPosts();
  console.log(`Found ${posts.length} posts`);

  let translated = 0;
  let skipped = 0;

  for (const post of posts) {
    // Skip if already translated
    if (post.title_en && post.summary_en && post.content_en) {
      skipped++;
      continue;
    }

    console.log(`Translating: ${post.date} (${post.type}) - ${post.title?.substring(0, 40)}...`);

    try {
      const fields = {};

      if (!post.title_en && post.title) {
        fields.title_en = await translate(post.title);
      }
      if (!post.summary_en && post.summary) {
        fields.summary_en = await translate(post.summary);
      }
      if (!post.content_en && post.content) {
        fields.content_en = await translate(post.content);
      }

      if (Object.keys(fields).length > 0) {
        await updatePost(post.id, fields);
        translated++;
        console.log(`  ✓ Done (${translated}/${posts.length - skipped})`);
      }

      // Rate limit: wait 1s between requests
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}`);
    }
  }

  console.log(`\nComplete. Translated: ${translated}, Already done: ${skipped}, Total: ${posts.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
