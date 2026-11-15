Write a new skill in the ai-skills folder, in the shape the folder lists, and install it.

The launch line is for Claude Code, the default; the text between the triple quotes can be given to another AI CLI as it is.

```
claude --permission-mode bypassPermissions """
Write a new skill named <name> in the ai-skills folder, for: <what-for>
# ~/workspace/ai-skills/<name>/SKILL.md · an item edited in place · container-based (DDEV by default)
# the body is plain Markdown any AI CLI can follow; no password, no token, no personal path

1. bash cmd-tools-ai-items.sh
   tell me whether a skill for this exists already; if one does, propose to adapt it instead
2. read one skill of the folder that is close to this, for its shape
3. ask me what the skill must do and must never do, and which commands it may run
4. write the file: the frontmatter (name, description with Use when), then the order of work, the commands, the rules
   every command, flag and path in it is one you ran or opened
5. bash cmd-tools-ai-items.sh <name> --install
   bash cmd-tools-ai-items.sh <name> --check

Show me the file before you install it, and install only when I say so.
Report where it was installed, and that a new session is needed to pick it up.
"""
```
