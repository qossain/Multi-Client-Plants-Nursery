import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function onlyOtherClientsChanged(client, files) {
  return slugPattern.test(client || '') && files.length > 0 && files.every((file) => {
    const [root, slug, ...rest] = file.split('/');
    return root === 'clients' && slugPattern.test(slug || '') && slug !== client && rest.length > 0;
  });
}

function main() {
  const { CLIENT, VERCEL_GIT_PREVIOUS_SHA: previous } = process.env;
  if (!slugPattern.test(CLIENT || '') || !/^[a-f0-9]{40}$/i.test(previous || '')) return 1;
  const ancestor = spawnSync('git', ['merge-base', '--is-ancestor', previous, 'HEAD']);
  if (ancestor.status !== 0) return 1;
  const diff = spawnSync('git', ['diff', '--no-renames', '--name-only', '-z', previous, 'HEAD'], { encoding: 'utf8' });
  if (diff.status !== 0 || !diff.stdout) return 1;
  const files = diff.stdout.split('\0').filter(Boolean);
  return onlyOtherClientsChanged(CLIENT, files) ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = main();
  console.log(result === 0 ? 'Only other clients changed; skip this build.' : 'Build required or history unavailable.');
  process.exitCode = result;
}
