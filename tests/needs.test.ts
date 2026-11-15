/**
 * What this plugin needs from the workspace it is added to (the manifest's `needs` and `suggests`).
 * The workspace reads them: github.com/webship/workspace, core/workspace-app/PLUGINS.md.
 */
import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

// Compiled, this test runs from dist/tests, so the package root is one folder further up.
const PKG = fs.existsSync(path.join(__dirname, '..', 'package.json')) ? path.join(__dirname, '..') : path.join(__dirname, '..', '..');
const manifest = JSON.parse(fs.readFileSync(path.join(PKG, 'package.json'), 'utf8')).workspacePlugin;
const KINDS: Record<string, string> = { agents: 'ai-agents', skills: 'ai-skills', commands: 'ai-commands', prompts: 'ai-prompts' };

test('the manifest needs no other plugin, and says which AI folders its items of the other kinds land in', () => {
  // The four AI folders would need each other in a circle, and a circle of needs is refused: the other
  // three are suggested, and an item whose folder is not active is skipped until it is.
  assert.deepStrictEqual(manifest.needs, undefined);
  assert.deepStrictEqual(manifest.suggests, ['ai-agents', 'ai-commands', 'ai-prompts']);
  for (const [kind, folder] of Object.entries(KINDS)) assert.ok(manifest.ai[kind].length > 0 && (folder === manifest.name || manifest.suggests.includes(folder)), `it ships ${kind}, placed in ${folder}`);
  assert.match(fs.readFileSync(path.join(PKG, 'README.md'), 'utf8'), /^## What it goes with$/m, 'and the README says so');
});
