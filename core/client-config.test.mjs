import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { loadClient } from './client-config.mjs';

test('client selection rejects missing, unsafe and unsupported slugs', () => {
  assert.throws(() => loadClient(), /CLIENT/);
  assert.throws(() => loadClient('../other'), /CLIENT/);
  assert.throws(() => loadClient('other'), /not yet supported/);
  assert.equal(loadClient('abdul-jabbar').config.name, 'Abdul Jabbar Nursery Farm');
});
