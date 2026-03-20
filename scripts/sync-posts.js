#!/usr/bin/env node
// Sync posts from Supabase to local markdown files (backup)
// Usage: node scripts/sync-posts.js
// Uses the publishable (anon) key — read-only access

const fs = require('fs');
const path = require('path');

const SB_URL = 'https://kszbdgfbihnawjgmwjlk.supabase.co';
const SB_KEY = 'sb_publishable_VrgzauRQ_kV_2MD0ujZ39w_0KREni_f';
const POSTS_DIR = path.join(__dirname, '..', 'posts');

async function fetchPosts(type) {
  const url = `${SB_URL}/rest/v1/posts?type=eq.${type}&select=date,type,title,summary,slug,content&order=date.desc`;
  const res = await fetch(url, {
    headers: {
      'apikey': SB_KEY,
      'Authorization': `Bearer ${SB_KEY}`
    }
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json();
}

function toFilename(post) {
  if (post.type === 'feature' && post.slug) {
    // feature-slug-name.md
    const shortSlug = post.slug.replace(/^\d{4}-\d{2}-/, '');
    return `feature-${shortSlug}.md`;
  }
  if (post.type === 'yearly') return `${post.date.substring(0, 4)}-review.md`;
  if (post.type === 'monthly') {
    const [y, m] = post.date.split('-');
    return `${y}-${m}-review.md`;
  }
  // daily
  return `${post.date}.md`;
}

function toMarkdown(post) {
  // Plain markdown without Jekyll frontmatter (posts/ is excluded from Jekyll build)
  const header = `# ${post.title || 'Daily AI — ' + post.date}\n\n> ${post.date}\n`;
  if (post.summary) {
    return header + `\n${post.summary}\n\n---\n\n${post.content || ''}`;
  }
  return header + '\n' + (post.content || '');
}

async function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const types = ['daily', 'monthly', 'yearly', 'feature'];
  let totalSynced = 0;
  let totalSkipped = 0;

  for (const type of types) {
    console.log(`Fetching ${type} posts...`);
    try {
      const posts = await fetchPosts(type);
      console.log(`  Found ${posts.length} ${type} posts`);

      for (const post of posts) {
        const filename = toFilename(post);
        const filepath = path.join(POSTS_DIR, filename);
        const content = toMarkdown(post);

        // Only write if file doesn't exist or content changed
        if (fs.existsSync(filepath)) {
          const existing = fs.readFileSync(filepath, 'utf-8');
          if (existing === content) {
            totalSkipped++;
            continue;
          }
        }

        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`  Synced: ${filename}`);
        totalSynced++;
      }
    } catch (e) {
      console.error(`  Error fetching ${type}: ${e.message}`);
    }
  }

  console.log(`\nDone. Synced: ${totalSynced}, Unchanged: ${totalSkipped}`);
}

main().catch(e => { console.error(e); process.exit(1); });
