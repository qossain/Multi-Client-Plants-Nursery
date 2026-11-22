import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { responsiveImage } from './image.ts';

test('uses an optimized image only when it exists for the selected client', () => {
  const previous = process.env.CLIENT;
  process.env.CLIENT = 'abdul-jabbar';
  try {
    assert.equal(responsiveImage('/plant-images/indoor-001.webp'), '/plant-images/optimized/indoor-001.webp');
    assert.equal(responsiveImage('/plant-images/no-such-image.webp'), '/plant-images/no-such-image.webp');
    assert.equal(responsiveImage('/other/image.webp'), '/other/image.webp');
  } finally {
    if (previous === undefined) delete process.env.CLIENT;
    else process.env.CLIENT = previous;
  }
});
