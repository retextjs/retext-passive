'use strict';

var test = require('tape');
var retext = require('retext');
var passive = require('.');

test('passive', function (t) {
  t.plan(2);

  var doc = [
    'He was withheld while we were being fed.',
    'Fed.',
    'The fed.'
  ].join('\n');

  retext()
    .use(passive)
    .process(doc, function (err, file) {
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
      );
    });

  retext()
    .use(passive, {ignore: ['fed']})
    .process(doc, function (err, file) {
      t.deepEqual(
        [err, file.messages.map(String)],
        [null, ['1:8-1:16: Don’t use the passive voice']],
        'should `ignore`'
      );
    });
});
