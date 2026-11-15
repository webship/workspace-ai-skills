# @webship.co/workspace-ai-skills

The **AI Skills** workspace of the [Webship Workspace](https://github.com/webship/workspace) dashboard:
the `ai-skills/` folder (type `ai-items`), its settings file (`core/config/workspace.ai-skills.settings.yml`),
its commands and its docs, as a plugin.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-ai-skills
bash core/scripts/plugins.sh --activate ai-skills     # puts `ai-skills` on the workspaces list of settings.yml
bash core/scripts/plugins.sh --install ai-skills      # the folder, its settings file (once), its commands, its docs (once)
```

The settings file and the docs are placed once and never overwritten: they hold what you put there.
`--deactivate` takes the workspace off the list; the folder and its content stay.

## What it goes with

The folder needs no other plugin. Its items of the other kinds land in the other AI folders (`ai-agents`, `ai-commands`, `ai-prompts`), which the manifest suggests and never adds: the four AI folders cannot need each other, a circle of needs is refused. While one of them is not an active workspace folder, `--install` says `skipped` for that kind and the items are placed, with no second step, once the folder is activated.

## The AI items

The plugin carries its own AI items (`ai/` in the package, the manifest's `ai` block), written for the work this folder is for. `--install` places each one in the workspace folder of its kind, when that folder is an active workspace folder; `--uninstall` removes them, and keeps one that was edited in its folder.

| Item | Kind | Lands in | What it is for |
| --- | --- | --- | --- |
| `ai-skills-keeper` | Agent | `ai-agents/ai-skills-keeper.md` | Looks after the skills of `ai-skills/` with `cmd-tools-ai-items.sh`: what is where, pull, add from a repository, install, check, update, copy to adapt, propose back, back up |
| `ai-skills-workflow` | Skill | `ai-skills/ai-skills-workflow/` | How work is done in `ai-skills/`: the shape of a skill, the order of work, every flag of `cmd-tools-ai-items.sh`, the settings keys; itself the example of a skill |
| `/ai-skills-install` | Command | `ai-commands/ai-skills-install.md` | `/ai-skills-install <skill> [<workspace>/<project>]`: reads the skill, installs it and checks what is installed |
| `ai-skills-write-a-new-skill` | Prompt | `ai-prompts/ai-skills-write-a-new-skill.md` | A new session that writes a new skill in the shape the folder lists |

From its folder an item is installed into the AI CLI (Claude Code by default) like any other: the folder's page on the dashboard, or `bash cmd-tools-ai-items.sh <name> --install` in the folder (`--to dev/<project>` for one project). A prompt is not installed: the New screen form lists it as the start of a new session. The body of every item is plain Markdown any AI CLI can follow; Claude Code is the default shape (the frontmatter, the launch line of a prompt). Every command, flag, settings key and path an item names is checked by `tests/items.test.ts`; the shape of the items is the one of the reference, [`docs/plugin-items-pattern.md` of the WordPress plugin](https://github.com/webship/workspace-wordpress/blob/1.0.x/docs/plugin-items-pattern.md).

## The commands

| Command |
| --- |
| `cmd-tool-backup-skill.sh` |
| `cmd-tool-sync-skills.sh` |
| `cmd-tools-ai-items.sh` |

The bash functions these commands call live in the dashboard's `core/scripts/functions`.

## Several repositories, any AI CLI

With a base that has it (after 1.0.10), the folder takes its skills from more than one repository, each recorded in
`ai-skills/.ai-sources.lock.json` so it is listed, checked, updated and removed on its own:

```bash
cd ~/workspace/ai-skills
bash cmd-tools-ai-items.sh --sources                                   # each source, its state, its skills and theirs
bash cmd-tools-ai-items.sh --source-add owner/repo                     # GitHub
bash cmd-tools-ai-items.sh --source-add https://git.drupalcode.org/project/name/-/tree/1.0.x/folder   # GitLab, any host
bash cmd-tools-ai-items.sh --source-add https://bitbucket.org/workspace/repo/src/main/folder
bash cmd-tools-ai-items.sh --source-add skills.sh/owner/repo/skill         # resolved to its GitHub repository
bash cmd-tools-ai-items.sh --source-check                              # ask upstream; changes nothing here
bash cmd-tools-ai-items.sh <id> --source-update                        # --force replaces one changed here
bash cmd-tools-ai-items.sh --source-remove <id>
```

What is fetched is files only: each one is shown, none is run.

From the folder, a skill installs into any AI CLI the settings list, converted to what that CLI reads.
Claude Code is the default, and `--install` with no `--cli` is Claude Code, as before:

```bash
bash cmd-tools-ai-items.sh --clis                                      # on or off, the default, installed, signed in
bash cmd-tools-ai-items.sh --items                                     # each skill against every CLI that is on
bash cmd-tools-ai-items.sh <name> --install --cli gemini               # one CLI; --cli all = every CLI that is on
bash cmd-tools-ai-items.sh <name> --install --cli codex --to dev/site  # one project only
bash cmd-tools-ai-items.sh <name> --uninstall --cli gemini
```

The AI CLIs are settings (`core/config/ai.settings.yml` over the shipped `core/config/ai.defaults.yml`): switching one
off, changing the default or adding one is an entry there.
The same is on the dashboard: **Sources and AI CLIs** in the rail of the folder's page. The guide is
`core/docs/ai-items-any-cli.md` in the workspace.
