#!/usr/bin/env node
// Upload translations from a JSON file to Supabase
// Usage: node scripts/upload-translations.js scripts/translations.json

const fs = require('fs');
const SB_URL = 'https://kszbdgfbihnawjgmwjlk.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_KEY;
if (!SB_KEY) { console.error('Missing SUPABASE_SERVICE_KEY env var'); process.exit(1); }

async function patchPost(id, fields) {
  const res = await fetch(`${SB_URL}/rest/v1/posts?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SB_KEY,
      'Authorization': `Bearer ${SB_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(fields)
  });
  if (!res.ok) throw new Error(`PATCH ${id}: ${res.status} ${await res.text()}`);
}

async function main() {
  const file = process.argv[2];
  if (!file) { console.error('Usage: node upload-translations.js <file.json>'); process.exit(1); }

  const translations = JSON.parse(fs.readFileSync(file, 'utf-8'));
  console.log(`Uploading ${translations.length} translations...`);

  let ok = 0, err = 0;
  for (const t of translations) {
    const fields = {};
    if (t.title_en) fields.title_en = t.title_en;
    if (t.summary_en) fields.summary_en = t.summary_en;
    if (t.content_en) fields.content_en = t.content_en;

    if (Object.keys(fields).length === 0) continue;

    try {
      await patchPost(t.id, fields);
      ok++;
      if (ok % 10 === 0) console.log(`  ${ok} done...`);
    } catch (e) {
      console.error(`  Error: ${e.message}`);
      err++;
    }
  }
  console.log(`Done. Success: ${ok}, Errors: ${err}`);
}

main().catch(e => { console.error(e); process.exit(1); });
