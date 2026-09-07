import fs from 'node:fs/promises';
import path from 'node:path';

const dir = 'content';
const files = (await fs.readdir(dir)).filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
const seenNumbers = new Set();
const seenTitles = new Set();
let failed = false;

for (const name of files) {
  const p = path.join(dir, name);
  try {
    const post = JSON.parse(await fs.readFile(p, 'utf8'));
    const required = ['date', 'number', 'title', 'slack_text', 'thread_answer', 'linkedin_text', 'topic_area'];
    const missing = required.filter(k => post[k] === undefined || post[k] === null || post[k] === '');
    if (missing.length) throw new Error(`missing: ${missing.join(', ')}`);
    if (`${post.date}.json` !== name) throw new Error(`date ${post.date} does not match filename`);
    if (seenNumbers.has(post.number)) throw new Error(`duplicate number ${post.number}`);
    if (seenTitles.has(post.title.toLowerCase())) throw new Error('duplicate title');
    seenNumbers.add(post.number);
    seenTitles.add(post.title.toLowerCase());
    console.log(`✓ ${name} — ${post.title}`);
  } catch (err) {
    failed = true;
    console.error(`✗ ${name}: ${err.message}`);
  }
}

if (failed) process.exit(1);
