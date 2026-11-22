import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { randomBytes } from 'node:crypto';
import { loadClient } from './client-config.mjs';

test('client selection rejects missing, unsafe and unknown slugs', () => {
  assert.throws(() => loadClient(), /CLIENT/);
  assert.throws(() => loadClient('../other'), /CLIENT/);
  assert.throws(() => loadClient(`missing-${randomBytes(8).toString('hex')}`), /Cannot read client/);
  assert.equal(loadClient('abdul-jabbar').config.name, 'Abdul Jabbar Nursery Farm');
});
