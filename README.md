# gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/jkislew/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/jkislew/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

Waiting Since 2013, Paid in USDC — a GTA 6 meme entered in make.fun's
"Post a GTA 6 meme on X" bounty.

The joke is the wait itself. GTA 6 was announced so long ago that a
gamer who started waiting in 2013 has grown a full grandpa beard,
while the make.fun ghost on the couch beside him pays out USDC for
memes about that wait. The ghost and the make.fun name are both in
the picture, part of the scene rather than pasted on top of it.

The meme is live as a public post on X from @archietecture1, carrying
`meme.png`, the bounty link and the entrant's play code
`makefun-gravel-bell-dome`. The post stays public until the results
are out, as the bounty asks. `POST.json` names that post's address, and
`main.ts` is the entry's verifiable half: it reads POST.json and the
meme, prints the meme's sha256, and reports any problem it finds —
for example the placeholder status id that stood in POST.json before
the meme was posted.

## Files

- `meme.png` — the meme itself, 1920×1280: the picture the post carries.
- `POST.json` — `{"url": "https://x.com/<handle>/status/<id>"}`, the post's address on X.
- `main.ts` — the entrypoint the grader runs; verifies and describes the entry.
- `LICENSE` — MIT.

## Run it

```sh
node main.ts
```

Node.js 22.18 or later, standard library only, no network. The run is
deterministic: the same entry files always print the same log. While
POST.json still holds the placeholder status id the run reports the
problem and exits 1; once the real post address is written in, it
exits 0.

---

<sub>Entered on [make.fun](https://make.fun/?ref=tpc75c2v&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
