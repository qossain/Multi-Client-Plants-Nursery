import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { onlyOtherClientsChanged } from './ignore-build.mjs';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('skips only changes confined to other client folders', () => {
  assert.equal(onlyOtherClientsChanged('one', ['clients/two/config.json', 'clients/three/images/a.webp']), true);
  for (const files of [[], ['clients/one/config.json'], ['core/a.ts'], ['package.json'], ['clients/two/a', 'src/pages/index.astro'], ['clients/_template/a'], ['clients/two']]) {
    assert.equal(onlyOtherClientsChanged('one', files), false);
  }
  assert.equal(onlyOtherClientsChanged('../bad', ['clients/two/config.json']), false);
});

test('CLI checks real git history and fails safe without a usable base', () => {
  const dir = mkdtempSync(join(tmpdir(), 'nursery-ignore-test-'));
  const script = resolve('scripts/ignore-build.mjs');
  const git = (...args) => {
    const result = spawnSync('git', args, { cwd: dir, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  const check = (previous) => spawnSync(process.execPath, [script], {
    cwd: dir, encoding: 'utf8', env: { ...process.env, CLIENT: 'one', VERCEL_GIT_PREVIOUS_SHA: previous },
  }).status;
  try {
    git('init', '-q');
    mkdirSync(join(dir, 'clients', 'two'), { recursive: true });
    writeFileSync(join(dir, 'clients', 'two', 'config.json'), '{}');
    git('add', '.');
    git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'baseline');
    const previous = git('rev-parse', 'HEAD');
    writeFileSync(join(dir, 'clients', 'two', 'config.json'), '{"name":"changed"}');
    git('add', '.');
    git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'other client');
    assert.equal(check(previous), 0);
    assert.equal(check(''), 1);
    assert.equal(check('0'.repeat(40)), 1);
    writeFileSync(join(dir, 'package.json'), '{}');
    git('add', '.');
    git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'shared');
    assert.equal(check(previous), 1);
  } finally {
    assert.equal(dirname(resolve(dir)), resolve(tmpdir()));
    assert.ok(basename(dir).startsWith('nursery-ignore-test-'));
    rmSync(dir, { recursive: true, force: true });
  }
});
