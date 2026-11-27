import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { randomBytes } from 'node:crypto';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createClient } from './new-client.mjs';
import { loadClient } from '../core/client-config.mjs';

test('scaffold is isolated, validated, and does not overwrite an existing client', async () => {
  const slug = `test-client-${randomBytes(6).toString('hex')}`;
  const directory = resolve('clients', slug);
  const options = { slug, name: 'Example Nursery', phone: '+15551234567', theme: 'rare-aroids', layout: 'catalog' };
  let created = false;
  try {
    await assert.rejects(createClient({ ...options, slug: '../unsafe' }), /Slug/);
    await createClient(options);
    created = true;
    assert.equal(loadClient(slug).config.name, options.name);
    await assert.rejects(createClient(options), /EEXIST/);
    const configPath = resolve(directory, 'config.json');
    const config = JSON.parse(await readFile(configPath, 'utf8'));
    const previousVercelEnv = process.env.VERCEL_ENV;
    process.env.VERCEL_ENV = 'production';
    try { assert.throws(() => loadClient(slug), /real domain/); }
    finally {
      if (previousVercelEnv === undefined) delete process.env.VERCEL_ENV;
      else process.env.VERCEL_ENV = previousVercelEnv;
    }
    config.layout = 'working-row-preview';
    config.workingRow = { ground: '#F2EEE4', ink: '#252922', deep: '#253D31', hessian: '#D5C7A7', accent: '#B62D6D', tape: '#FF1493', lightAccent: '#FFB8D6', specimenName: 'Topiary', exploreLabel: 'Explore', sectionNote: 'Look', sectionTitle: 'Plants', tagLabel: 'View', enquiryLabel: 'Ask' };
    config.business = { whatsappConfirmed: false, stockStatus: { value: null, confirmed: false }, stockLastUpdated: { value: null, confirmed: false }, responseTimePromise: { value: null, confirmed: false } };
    await writeFile(configPath, JSON.stringify(config));
    assert.equal(loadClient(slug).config.business.stockStatus.confirmed, false);
    process.env.VERCEL_ENV = 'production';
    try { assert.throws(() => loadClient(slug), /preview cannot be deployed/); }
    finally {
      if (previousVercelEnv === undefined) delete process.env.VERCEL_ENV;
      else process.env.VERCEL_ENV = previousVercelEnv;
    }
    config.allowPreviewProduction = true;
    await writeFile(configPath, JSON.stringify(config));
    const previousUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    process.env.VERCEL_ENV = 'production';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'example-nursery.vercel.app';
    try { assert.equal(loadClient(slug).config.site, 'https://example-nursery.vercel.app'); }
    finally {
      if (previousVercelEnv === undefined) delete process.env.VERCEL_ENV;
      else process.env.VERCEL_ENV = previousVercelEnv;
      if (previousUrl === undefined) delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
      else process.env.VERCEL_PROJECT_PRODUCTION_URL = previousUrl;
    }
    delete config.business.stockStatus;
    await writeFile(configPath, JSON.stringify(config));
    assert.throws(() => loadClient(slug), /owner-confirmed fields/);
    config.business.stockStatus = { value: null, confirmed: false };
    config.heroDesktop = '/../outside.svg';
    await writeFile(configPath, JSON.stringify(config));
    assert.throws(() => loadClient(slug), /image/);
  } finally {
    if (created) {
      assert.equal(dirname(directory), resolve('clients'));
      assert.ok(slug.startsWith('test-client-'));
      await rm(directory, { recursive: true, force: true });
    }
  }
});
