#!/usr/bin/env node
/**
 * publish-samples.js
 * ------------------
 * One-command automation:
 *   1. Validates public/links.txt has at least one link
 *   2. Stages all changed source files
 *   3. Commits with an auto-generated message
 *   4. Pushes to GitHub
 *
 * Usage:  npm run publish-samples
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LINKS_FILE = path.join(ROOT, 'public', 'links.txt');

// ─── helpers ─────────────────────────────────────────────────────────────────

function run(cmd, label) {
  console.log(`\n> ${label ?? cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

function countLinks(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');
  return (text.match(/https?:\/\//g) || []).length;
}

function listEntries(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');
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

// 1. Validate links.txt
if (!fs.existsSync(LINKS_FILE)) {
  console.error(`\nERROR: links.txt not found at:\n  ${LINKS_FILE}`);
  console.error('Create the file and paste your sample links, then re-run.\n');
  process.exit(1);
}

const linkCount = countLinks(LINKS_FILE);
if (linkCount === 0) {
  console.error('\nERROR: No links found in links.txt.');
  console.error('Paste at least one URL and re-run.\n');
  process.exit(1);
}

const titles = listEntries(LINKS_FILE);
console.log(`\nFound ${linkCount} sample link(s):`);
titles.forEach(t => console.log(`  - ${t}`));

// 2. Check if there is anything to commit
if (!hasUnstagedChanges()) {
  console.log('\nNothing to commit — links.txt has not changed since last push.');
  console.log('Add new links to links.txt and re-run.\n');
  process.exit(0);
}

// 3. Stage all changes (source only; dist is gitignored)
run('git add -A', 'Staging all source changes...');

// 4. Auto commit message with IST timestamp
const now = new Date();
const timestamp = now.toLocaleString('en-IN', {
  timeZone: 'Asia/Kolkata',
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', hour12: true
});
const newEntries = titles.length;
const commitMsg = `feat: add ${newEntries} sample(s) - ${timestamp}`;
run(`git commit -m "${commitMsg}"`, `Committing: "${commitMsg}"`);

// 5. Push
run('git push', 'Pushing to GitHub (origin main)...');

console.log('\n===============================================');
console.log('  DONE! Your samples are now live on GitHub.');
console.log('===============================================\n');
