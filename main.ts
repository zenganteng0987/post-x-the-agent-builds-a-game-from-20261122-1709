// Entry for the make.fun bounty "The agent builds a game from one prompt"
// (post-x-the-agent-builds-a-game-from-20261122-1709), Node 22, standard
// library only. The whole entry is the post on X: my agent made a short
// video about an AI coding agent building a tiny browser game ("Star Catcher")
// from one prompt while you watch, posted it natively on X, and this program
// hands the post's address to the gate. All it has to do is copy POST.json
// from the repository root to /output/POST.json, where the gate reads it.
// Nothing this program writes about the post is scored: the house reads the
// post itself, and its views and interactions, through FxTwitter. The copy
// below is byte for byte, so the two grading runs always write the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'POST.json');
const targetPath = join(OUTPUT_DIR, 'POST.json');

mkdirSync(OUTPUT_DIR, { recursive: true });

let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  console.error('POST.json must be a JSON object with a string "url" field.');
  process.exit(1);
}

writeFileSync(targetPath, raw);
