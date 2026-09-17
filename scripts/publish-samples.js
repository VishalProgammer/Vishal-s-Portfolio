#!/usr/bin/env node
/**
 * publish-samples.js
 * ------------------
 * Interactive CLI to add samples to samples.json and push to GitHub.
 *
 * Usage:
 *   npm run publish-samples              (interactive: asks title, URL, type)
 *   npm run publish-samples -- --push    (just commit + push current changes)
 *
 * Flow:
 *   1. Asks: Type? (video / voiceover)
 *   2. If video -> Asks: Category? (Shorts/Reels or Long Videos)
 *   3. Asks: Title
 *   4. Asks: URL
 *   5. Asks: Add another? (y/n)
 *   6. Auto-commits and pushes to GitHub
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SAMPLES_FILE = path.join(ROOT, 'public', 'samples.json');

// ─── helpers ─────────────────────────────────────────────────────────────────

function run(cmd, label) {
  console.log(`\n> ${label ?? cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

function loadSamples() {
  if (!fs.existsSync(SAMPLES_FILE)) {
    return {
      videoEdits: { shorts_reels: [], long_videos: [] },
      voiceOvers: []
    };
  }
  return JSON.parse(fs.readFileSync(SAMPLES_FILE, 'utf-8'));
}

function saveSamples(data) {
  fs.writeFileSync(SAMPLES_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function hasUnstagedChanges() {
  try {
    const out = execSync('git status --porcelain', { cwd: ROOT }).toString();
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

function countAllLinks(data) {
  const vids = (data.videoEdits?.shorts_reels?.length || 0)
             + (data.videoEdits?.long_videos?.length || 0);
  const vos = data.voiceOvers?.length || 0;
  return vids + vos;
}

// ─── readline prompt ─────────────────────────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function choose(question, options) {
  return new Promise(async (resolve) => {
    console.log(`\n${question}`);
    options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
    while (true) {
      const ans = await ask(`Enter choice (1-${options.length}): `);
      const idx = parseInt(ans, 10) - 1;
      if (idx >= 0 && idx < options.length) {
        resolve({ index: idx, value: options[idx] });
        return;
      }
      console.log('  Invalid choice, try again.');
    }
  });
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n===============================================');
  console.log('  PUBLISH SAMPLES  |  Portfolio Automation');
  console.log('===============================================');

  // --push flag: just commit and push without adding new samples
  if (process.argv.includes('--push')) {
    if (!hasUnstagedChanges()) {
      console.log('\nNothing to commit. Add new samples first.\n');
      process.exit(0);
    }
    commitAndPush();
    process.exit(0);
  }

  const data = loadSamples();
  let addedCount = 0;

  // Loop: keep adding samples
  while (true) {
    const { index: typeIdx } = await choose('What type of sample?', [
      'Video Edit',
      'Voiceover'
    ]);

    if (typeIdx === 0) {
      // Video
      const { index: catIdx } = await choose('Video category?', [
        'Shorts / Reels  (vertical 9:16)',
        'Long Videos      (widescreen 16:9)'
      ]);

      const title = (await ask('\nSample title: ')).trim();
      if (!title) { console.log('  Skipped (empty title).'); continue; }

      const url = (await ask('Paste URL: ')).trim();
      if (!url || !url.startsWith('http')) { console.log('  Skipped (invalid URL).'); continue; }

      const bucket = catIdx === 0 ? 'shorts_reels' : 'long_videos';

      // Check duplicate
      const exists = data.videoEdits[bucket].some(e => e.url === url);
      if (exists) {
        console.log('  WARNING: This URL already exists. Skipping duplicate.');
        continue;
      }

      data.videoEdits[bucket].push({ title, url });
      addedCount++;
      console.log(`  Added "${title}" to ${catIdx === 0 ? 'Shorts/Reels' : 'Long Videos'}`);

    } else {
      // Voiceover
      const title = (await ask('\nSample title: ')).trim();
      if (!title) { console.log('  Skipped (empty title).'); continue; }

      const url = (await ask('Paste URL: ')).trim();
      if (!url || !url.startsWith('http')) { console.log('  Skipped (invalid URL).'); continue; }

      const exists = data.voiceOvers.some(e => e.url === url);
      if (exists) {
        console.log('  WARNING: This URL already exists. Skipping duplicate.');
        continue;
      }

      data.voiceOvers.push({ title, url });
      addedCount++;
      console.log(`  Added "${title}" to Voiceovers`);
    }

    // Ask to add more
    const more = (await ask('\nAdd another sample? (y/n): ')).trim().toLowerCase();
    if (more !== 'y' && more !== 'yes') break;
  }

  rl.close();

  if (addedCount === 0) {
    console.log('\nNo samples added. Exiting.\n');
    process.exit(0);
  }

  // Save
  saveSamples(data);
  const total = countAllLinks(data);
  console.log(`\nSaved ${addedCount} new sample(s) to samples.json (${total} total).`);

  // Commit and push
  commitAndPush(addedCount);
}

function commitAndPush(addedCount) {
  run('git add -A', 'Staging all changes...');

  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const msg = addedCount
    ? `feat: add ${addedCount} new sample(s) - ${timestamp}`
    : `chore: update samples - ${timestamp}`;

  run(`git commit -m "${msg}"`, `Committing: "${msg}"`);
  run('git push', 'Pushing to GitHub...');

  console.log('\n===============================================');
  console.log('  DONE! Your samples are now live on GitHub.');
  console.log('===============================================\n');
}

main().catch(err => {
  console.error('\nFailed:', err.message);
  rl.close();
  process.exit(1);
});
