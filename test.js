'use strict'

var test = require('tape')
var retext = require('retext')
var passive = require('.')

test('passive', function(t) {
  t.plan(3)

  var doc = [
    'He was withheld while we were being fed.',
    'Fed.',
    'The fed.'
  ].join('\n')

  retext()
    .use(passive)
    .process(doc, function(err, file) {
      t.deepEqual(
        [err, file.messages.map(String)],
        [
          null,
          [
            '1:8-1:16: Don’t use the passive voice',
            '1:37-1:40: Don’t use the passive voice'
          ]
        ],
        'should work'
      )

      t.deepEqual(
        file.messages[0],
        {
          message: 'Don’t use the passive voice',
          name: '1:8-1:16',
          reason: 'Don’t use the passive voice',
          line: 1,
          column: 8,
          location: {
            start: {line: 1, column: 8, offset: 7},
            end: {line: 1, column: 16, offset: 15}
          },
          source: 'retext-passive',
          ruleId: 'withheld',
          fatal: false,
          actual: 'withheld',
          expected: []
        },
        'should emit messages'
      )
    })

  retext()
    .use(passive, {ignore: ['fed']})
    .process(doc, function(err, file) {
      t.deepEqual(
        [err, file.messages.map(String)],
        [null, ['1:8-1:16: Don’t use the passive voice']],
        'should `ignore`'
      )
    })
})
