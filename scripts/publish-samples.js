#!/usr/bin/env node
/**
 * publish-samples.js
 * ------------------
 * Single-command automation. No prompts, no interactive menus.
 *
 * Usage:
 *   npm run publish-samples -- short "Title here" "https://url"
 *   npm run publish-samples -- long  "Title here" "https://url"
 *   npm run publish-samples -- vo    "Title here" "https://url"
 *
 * Examples:
 *   npm run publish-samples -- short "Coffee Ad" "https://youtube.com/shorts/abc123"
 *   npm run publish-samples -- long  "Full Podcast" "https://youtu.be/xyz789"
 *   npm run publish-samples -- vo    "Hindi Demo" "https://soundcloud.com/user/track"
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SAMPLES_FILE = path.join(ROOT, 'public', 'samples.json');

// ─── helpers ─────────────────────────────────────────────────────────────────

function run(cmd, label) {
  console.log(`\n> ${label}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

function loadSamples() {
  if (!fs.existsSync(SAMPLES_FILE)) {
    return { videoEdits: { shorts_reels: [], long_videos: [] }, voiceOvers: [] };
  }
  return JSON.parse(fs.readFileSync(SAMPLES_FILE, 'utf-8'));
}

function saveSamples(data) {
  fs.writeFileSync(SAMPLES_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function printUsage() {
  console.log(`
USAGE:
  npm run publish-samples -- short "Title" "URL"    Add a Shorts/Reels video
  npm run publish-samples -- long  "Title" "URL"    Add a Long Video
  npm run publish-samples -- vo    "Title" "URL"    Add a Voiceover sample

EXAMPLES:
  npm run publish-samples -- short "Coffee Ad" "https://youtube.com/shorts/abc123"
  npm run publish-samples -- long  "Full Podcast" "https://youtu.be/xyz789"
  npm run publish-samples -- vo    "Hindi Demo" "https://soundcloud.com/user/track"
`);
}

// ─── main ────────────────────────────────────────────────────────────────────

console.log('\n===============================================');
console.log('  PUBLISH SAMPLES  |  Portfolio Automation');
console.log('===============================================');

// Parse args. npm passes all words after -- as separate args,
// so we need to find the type (first arg), the URL (last arg with http),
// and everything in between is the title.
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('\nERROR: Missing arguments.');
  printUsage();
  process.exit(1);
}

const type = args[0];

// Validate type
const validTypes = { short: 'shorts_reels', long: 'long_videos', vo: 'voiceover' };
if (!validTypes[type]) {
  console.error(`\nERROR: Unknown type "${type}". Use: short, long, or vo`);
  printUsage();
  process.exit(1);
}

// URL is the last argument that starts with http
const urlIndex = args.findLastIndex(a => a.startsWith('http'));
if (urlIndex < 0) {
  console.error('\nERROR: No URL found. Make sure to include a URL starting with http.');
  printUsage();
  process.exit(1);
}
const url = args[urlIndex];

// Title is everything between type and the URL
const titleParts = args.slice(1, urlIndex);
if (titleParts.length === 0) {
  console.error('\nERROR: Title cannot be empty.');
  printUsage();
  process.exit(1);
}
const title = titleParts.join(' ').trim();

// Load and update
const data = loadSamples();
const entry = { title, url };

if (type === 'vo') {
  if (data.voiceOvers.some(e => e.url === url)) {
    console.error(`\nERROR: This URL already exists in voiceovers. Skipping.`);
    process.exit(1);
  }
  data.voiceOvers.push(entry);
  console.log(`\n  + Added voiceover: "${title}"`);
} else {
  const bucket = validTypes[type];
  if (data.videoEdits[bucket].some(e => e.url === url)) {
    console.error(`\nERROR: This URL already exists in ${type === 'short' ? 'Shorts/Reels' : 'Long Videos'}. Skipping.`);
    process.exit(1);
  }
  data.videoEdits[bucket].push(entry);
  const label = type === 'short' ? 'Shorts/Reels' : 'Long Videos';
  console.log(`\n  + Added video (${label}): "${title}"`);
}

// Save
saveSamples(data);
console.log('  Saved to samples.json');

// Git: stage, commit, push
run('git add -A', 'Staging changes...');

const now = new Date();
const ts = now.toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', hour12: true
});

// Use single quotes inside double quotes to avoid shell quoting issues
const safeTitle = title.replace(/"/g, "'");
const msg = `feat: add sample [${safeTitle}] - ${ts}`;

// Write commit message to a temp file to avoid all shell quoting issues
const tmpMsgFile = path.join(ROOT, '.commit-msg.tmp');
fs.writeFileSync(tmpMsgFile, msg, 'utf-8');
try {
  run(`git commit -F .commit-msg.tmp`, `Committing: ${msg}`);
} finally {
  if (fs.existsSync(tmpMsgFile)) fs.unlinkSync(tmpMsgFile);
}

run('git push', 'Pushing to GitHub...');

console.log('\n===============================================');
console.log('  DONE! Sample added and pushed to GitHub.');
console.log('===============================================\n');
