import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextPassive from './index.js'

test('retext-passive', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  const doc = 'He was withheld while we were being fed.\nFed.\nThe fed.'
  const file = await retext().use(retextPassive).process(doc)

  await t.test('should emit a message w/ metadata', async function () {
    assert.deepEqual(JSON.parse(JSON.stringify(file.messages[0])), {
      column: 8,
      fatal: false,
      message: 'Don’t use the passive voice',
      line: 1,
      name: '1:8-1:16',
      place: {
        start: {line: 1, column: 8, offset: 7},
        end: {line: 1, column: 16, offset: 15}
      },
      reason: 'Don’t use the passive voice',
      ruleId: 'withheld',
      source: 'retext-passive',
      actual: 'withheld',
      expected: [],
      url: 'https://github.com/retextjs/retext-passive#readme'
    })
  })

  await t.test('should emit messasges', async function () {
    assert.deepEqual(
      file.messages.map(String),
      [
        '1:8-1:16: Don’t use the passive voice',
        '1:37-1:40: Don’t use the passive voice'
      ],
      'should work'
    )
  })

  await t.test('should `ignore`', async function () {
    const file = await retext()
      .use(retextPassive, {ignore: ['fed']})
      .process(doc)

    assert.deepEqual(file.messages.map(String), [
      '1:8-1:16: Don’t use the passive voice'
    ])
  })
})
