# Fork rationale

This repository is a fork of <https://github.com/Taitava/obsidian-shellcommands>.

## Why this fork exists

Upstream had a long-standing bug that broke the settings UI, making the plugin unusable in recent versions of Obsidian.

It is the only plugin that I know of which has such sophisticated shell execution features. Thanks go to the author for building such a comprehensive codebase. It really strikes the right chord for me.

While I fixed the original bug (see <https://github.com/Taitava/obsidian-shellcommands/pull/482>) it surfaced that the projects entire build infrastructure was quite outdated, too. Having a solid background in coding (but not so much in js/ts), I used ChatGPT to update that.

While I was at it, I burned some more LLM tokens to modernize things:

- Update the code to Obsidian minVersion 1.13 and adopt to more recent APIs
- Add some minor unit tests
- Resolve some of the simpler TODOs/FIXMEs
- Refactor the settings UI to be more "Obsidianic". Interestingly, this burnt the most tokens.

I have no plans to implement additional features.

## Intended relationship to upstream

This fork is intended to be a long-lived downstream fork, mostly for my personal use. People are of course welcome to use it through <https://github.com/tfthacker/obsidian42-brat>. It is unlikely that it will ever appear in the official Obsidian catalog.

Upstream is welcome to merge it in, but given the massive amount of changes I doubt that this will ever happen.

I’ll keep maintaining my fork for as long as I use Obsidian and the plugin (which I cannot see will ever change) and my changes are not merged (or otherwise resolved) into upstream. I expect this to remain the case for quite some time yet.

Thanks to LLMs, this fork is worth not much more than half a day of my time and some tokens. All credits for this plugin should go to the original author. If you want to donate for his work because you find it useful, head over to <https://publish.obsidian.md/shellcommands/Donate>.

## Local changes

I'll document these in the original CHANGELOG.md, starting with `0.23.1`.
