// gta6-meme-x-01 — "Post a GTA 6 meme on X" (make.fun bounty).
//
// The real entry lives on X: a public post from @archietecture1 whose
// picture is the meme in this repository — a gamer who has been waiting
// for GTA 6 since 2013, grandpa beard and all, with the make.fun ghost
// beside him paying USDC for memes about the wait. The post's text
// carries the bounty link and the play code below.
//
// This program is the checkable half of that entry. It opens POST.json
// to learn the post's address, hashes meme.png, and prints one fixed
// log line per fact. Node.js standard library only, no network, and
// the same files always produce the same log.
//
// Run it with: node main.ts

import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SLUG = "gta6-meme-x-01";
const BOUNTY_PAGE = "https://make.fun/bounty/gta6-meme-x-01";
const PLAY_CODE = "makefun-gravel-bell-dome";
const MEME_NAME = "meme.png";
const PLACEHOLDER_ID = "0000000000000000000";

const here = dirname(fileURLToPath(import.meta.url));

function postAddress(): string {
  const text = readFileSync(join(here, "POST.json"), "utf8");
  const data: unknown = JSON.parse(text);
  if (typeof data !== "object" || data === null || !("url" in data)) {
    throw new Error("POST.json must hold an object with a url field");
  }
  const value = (data as { url: unknown }).url;
  if (typeof value !== "string") {
    throw new Error("the url in POST.json must be a string");
  }
  return value;
}

function memeFingerprint(): { size: number; digest: string } {
  const bytes = readFileSync(join(here, MEME_NAME));
  const digest = createHash("sha256").update(bytes).digest("hex");
  return { size: bytes.length, digest };
}

function addressProblems(address: string): string[] {
  // The house reads the post through X's public embed before grading,
  // so the address must be a real public post on x.com — and it must be
  // this entrant's own post, not the all-zero placeholder that stood
  // here before the meme was posted. A malformed address is reported
  // as one problem and the placeholder check is skipped for it.
  const shape = /^https:\/\/x\.com\/([A-Za-z0-9_]+)\/status\/(\d+)$/;
  const found = shape.exec(address);
  if (found === null) {
    return ["post url is not an https://x.com/<handle>/status/<id> address"];
  }
  if (found[2] === PLACEHOLDER_ID) {
    return [
      "post url still holds the placeholder status id: post the meme on X, then write its real address into POST.json",
    ];
  }
  return [];
}

function codeProblems(code: string): string[] {
  // Play codes arrive as makefun- plus three hyphen-joined words.
  const shape = /^makefun-[a-z]+-[a-z]+-[a-z]+$/;
  return shape.test(code)
    ? []
    : [`play code ${code} is not of the form makefun-<word>-<word>-<word>`];
}

function run(): void {
  const address = postAddress();
  const meme = memeFingerprint();
  const problems = [...addressProblems(address), ...codeProblems(PLAY_CODE)];

  const lines = [
    `competition: ${SLUG}`,
    `bounty: ${BOUNTY_PAGE}`,
    `play code: ${PLAY_CODE}`,
    `post: ${address}`,
    `meme file: ${MEME_NAME}`,
    `meme bytes: ${meme.size}`,
    `meme sha256: ${meme.digest}`,
    `checks failed: ${problems.length}`,
  ];
  for (const line of lines) {
    console.log(line);
  }
  for (const problem of problems) {
    console.log(`problem: ${problem}`);
  }
  if (problems.length > 0) {
    process.exitCode = 1;
  }
}

run();
