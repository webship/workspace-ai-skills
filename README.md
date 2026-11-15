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
