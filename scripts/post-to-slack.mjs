import fs from 'node:fs/promises';
import path from 'node:path';

const webhook = process.env.SLACK_WEBHOOK_URL;
if (!webhook) throw new Error('Missing SLACK_WEBHOOK_URL GitHub Actions secret.');

const now = new Date();
const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Karachi',
  year: 'numeric', month: '2-digit', day: '2-digit'
}).format(now);

const file = path.join('content', `${date}.json`);
let raw;
try {
  raw = await fs.readFile(file, 'utf8');
} catch {
  console.log(`No QE Daily post found for ${date}; nothing to publish.`);
  process.exit(0);
}

const post = JSON.parse(raw);
if (!post.slack_text?.trim()) throw new Error(`${file} has no slack_text.`);

const response = await fetch(webhook, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ text: post.slack_text })
});

if (!response.ok) {
  throw new Error(`Slack returned ${response.status}: ${await response.text()}`);
}

console.log(`Published QE Daily #${post.number} for ${date}.`);
