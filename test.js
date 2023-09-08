import test from 'tape'
import {retext} from 'retext'
import retextPassive from './index.js'

test('retext-passive', (t) => {
  t.plan(3)

  const doc = [
    'He was withheld while we were being fed.',
    'Fed.',
    'The fed.'
  ].join('\n')

  retext()
    .use(retextPassive)
    .process(doc)
    .then((file) => {
      t.deepEqual(
        file.messages.map(String),
        [
          '1:8-1:16: Don’t use the passive voice',
          '1:37-1:40: Don’t use the passive voice'
        ],
        'should work'
      )

      t.deepEqual(
        JSON.parse(JSON.stringify(file.messages[0])),
        {
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
        },
        'should emit messages'
      )
    }, t.ifErr)

  retext()
    .use(retextPassive, {ignore: ['fed']})
    .process(doc)
    .then((file) => {
      t.deepEqual(
        file.messages.map(String),
        ['1:8-1:16: Don’t use the passive voice'],
        'should `ignore`'
      )
    }, t.ifErr)
})
