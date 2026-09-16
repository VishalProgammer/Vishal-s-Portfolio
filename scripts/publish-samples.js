#!/usr/bin/env node
/**
 * publish-samples.js
 * ------------------
 * One-command automation:
 *   1. Copies "Video edit and VO Samples.txt" -> "links.txt" (auto-sync)
 *   2. Validates that at least one link exists
 *   3. Stages all changed source files
 *   4. Commits with an auto-generated message
 *   5. Pushes to GitHub
 *
 * Usage:  npm run publish-samples
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SAMPLES_FILE = path.join(ROOT, 'public', 'Video edit and VO Samples.txt');
const LINKS_FILE = path.join(ROOT, 'public', 'links.txt');

// ─── helpers ─────────────────────────────────────────────────────────────────

function run(cmd, label) {
  console.log(`\n> ${label ?? cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

function countLinks(text) {
  return (text.match(/https?:\/\//g) || []).length;
}

function listEntries(text) {
  const entries = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line.includes('http')) continue;
    const dashIdx = line.search(/ - https?:\/\//);
    const title = dashIdx !== -1 ? line.slice(0, dashIdx).trim() : line;
    entries.push(title);
  }
  return entries;
}

function hasUnstagedChanges() {
  try {
    const out = execSync('git status --porcelain', { cwd: ROOT }).toString();
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

// ─── main ────────────────────────────────────────────────────────────────────

console.log('\n===============================================');
console.log('  PUBLISH SAMPLES  |  Portfolio Automation');
console.log('===============================================');

// 1. Validate samples file exists
if (!fs.existsSync(SAMPLES_FILE)) {
  console.error(`\nERROR: Samples file not found at:\n  ${SAMPLES_FILE}`);
  console.error('Create the file and paste your sample links, then re-run.\n');
  process.exit(1);
}

// 2. Read and validate
const text = fs.readFileSync(SAMPLES_FILE, 'utf-8');
const linkCount = countLinks(text);

if (linkCount === 0) {
  console.error('\nERROR: No links found in "Video edit and VO Samples.txt".');
  console.error('Paste at least one URL and re-run.\n');
  process.exit(1);
}

const titles = listEntries(text);
console.log(`\nFound ${linkCount} sample link(s):`);
titles.forEach(t => console.log(`  - ${t}`));

// 3. Auto-sync: copy samples file -> links.txt (so the website picks it up)
fs.copyFileSync(SAMPLES_FILE, LINKS_FILE);
console.log('\n> Synced "Video edit and VO Samples.txt" -> "links.txt"');

// 4. Check if there is anything to commit
if (!hasUnstagedChanges()) {
  console.log('\nNothing to commit — no changes since last push.');
  console.log('Add new links to "Video edit and VO Samples.txt" and re-run.\n');
  process.exit(0);
}

// 5. Stage all changes
run('git add -A', 'Staging all changes...');

// 6. Auto commit message with IST timestamp
const now = new Date();
const timestamp = now.toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', hour12: true
});
const commitMsg = `feat: update samples (${linkCount} total) - ${timestamp}`;
run(`git commit -m "${commitMsg}"`, `Committing: "${commitMsg}"`);

// 7. Push
run('git push', 'Pushing to GitHub...');

console.log('\n===============================================');
console.log('  DONE! Your samples are now live on GitHub.');
console.log('===============================================\n');
