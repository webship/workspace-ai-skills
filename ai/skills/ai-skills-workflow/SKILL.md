---
name: ai-skills-workflow
description: How work is done in the `ai-skills/` folder of the Webship Workspace — what a skill is there and the shape it has, how the skills of the folder are listed, pulled from the shared repository, added from any GitHub repository, installed into the AI CLI or into one project, checked and updated, copied to adapt and proposed back with `cmd-tools-ai-items.sh`, with every flag of the command and the settings keys of the folder. Use when asked to "write a skill", "install a skill", "update the installed skills", "pull the shared skills", or when a file of `ai-skills/` is about to be written.
argument-hint: '[what you are about to do in ai-skills]'
---

# ai-skills-workflow

`~/workspace/ai-skills` is the AI Skills folder of a Webship Workspace (container-based, DDEV by default).
AI Skills holds the skills of the workspace as items a person edits in place: one skill is one folder, `~/workspace/ai-skills/<name>/`, with a `SKILL.md` in it and whatever it needs beside it. It comes with the AI Skills plugin (`@webship.co/workspace-ai-skills`), which places the commands below in the folder. Every command finds the workspace from its own path; run it from the folder, and read `bash <command> --help` before quoting a flag.

## The order of work

1. **See what is where**: `bash cmd-tools-ai-items.sh`.
2. **Start from one that exists**: `bash cmd-tools-ai-items.sh my-skill --clone-to my-skill-2`, or write
   `~/workspace/ai-skills/my-skill/SKILL.md` in the shape below.
3. **Read it as its reader would**: an AI assistant that knows nothing else about the work.
4. **Install**: `bash cmd-tools-ai-items.sh my-skill --install` (add `--to dev/mysite` for one project).
5. **Keep it in step**: `bash cmd-tools-ai-items.sh --check`, then `bash cmd-tools-ai-items.sh --update`.

## Commands

| Command | What it does | Flags |
| --- | --- | --- |
| `cmd-tool-backup-skill.sh` | One skill as an archive, into `backups/ai-skills/`: `<name>` | none |
| `cmd-tool-sync-skills.sh` | An older sync of skills. It reads the settings file of a folder name a fresh workspace does not have, so it does not know which folder it is in: do not run it; `cmd-tools-ai-items.sh` does its work | `--filter` `--install` `--source` |
| `cmd-tools-ai-items.sh` | The skills of this folder against the AI CLI and the shared repository: `[name]`. With no flag it shows what each place has | `--add` `--check` `--clone-to` `--confirm` `--fetch` `--filter` `--install` `--list-remote` `--propose` `--pull` `--purpose` `--source` `--status` `--summary` `--to` `--update` |

## The shape of a skill

A skill is a folder; its `SKILL.md` has a frontmatter, then how the work is done:

| Part | What it holds |
| --- | --- |
| `name` | The skill's name: the name of the folder |
| `description` | What it does, then `Use when …` with the phrases a person says; this is what an AI assistant reads to decide whether to load it |
| The body | Plain Markdown any AI CLI can follow: the order of work, the commands, the rules |
| Files beside it | What is too long for the body or is meant to be copied: examples, references. Every file of the folder goes with the skill |

Names are short, lowercase, with hyphens, and start with what the skill belongs to. A skill that is already in the folder under a name is kept when a plugin brings one of the same name.

## Settings

| Key | File | What it says |
| --- | --- | --- |
| `doc.name` | `core/config/workspace.ai-skills.settings.yml` | The folder under the workspace root: `ai-skills` |
| `type` | `core/config/workspace.ai-skills.settings.yml` | `ai-items`: the page lists AI items, with its own install, fetch and propose actions |
| `assistant.name`, `assistant.placeholder` | `core/config/workspace.ai-skills.settings.yml` | What the assistant is called on this page; `default` takes the workspace's |
| `workspaces` | `core/config/settings.yml` | The active folders; `ai-skills` is on it once the plugin is activated |
| `sources.ai_items.repo`, `sources.ai_items.ref` | `core/config/settings.yml` | The shared repository `--list-remote`, `--pull` and `--propose` talk to, and its branch |

## Rules

- **The folder is the draft, the AI CLI is the copy.** Change a skill here, then install it again; never edit the installed copy.
- **`--pull` and `--add` bring in what somebody else wrote.** Read a skill before it is installed: it tells an AI assistant what to do on this machine.
- **`--propose` prints its plan and stops**; `--confirm` files an issue and opens a request on the shared repository: only when asked.
- **Nothing private in a skill**: no password, no token, no personal path; addresses are example addresses.
- **The body is plain Markdown any AI CLI can follow.** Claude Code is the default shape (the frontmatter, the launch line of a prompt), never a requirement.
- **Back up before a rewrite**: `bash cmd-tool-backup-skill.sh <name>`.
- The workspace is container-based (DDEV by default): a skill that describes it says so.
- **Never run `cmd-tool-sync-skills.sh`**: it does not know which folder it is in on a fresh workspace.

The AI Skills plugin places these beside this one, each in the workspace folder of its kind: the agent `ai-skills-keeper` (`ai-agents/`), the command `/ai-skills-install` (`ai-commands/`) and the prompt `ai-skills-write-a-new-skill` (`ai-prompts/`).
