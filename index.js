'use strict'

var difference = require('lodash.difference')
var search = require('nlcst-search')
var toString = require('nlcst-to-string')
var position = require('unist-util-position')
var findBefore = require('unist-util-find-before')
var patterns = require('./list')

module.exports = passive

var verbs = ['am', 'are', 'were', 'being', 'is', 'been', 'was', 'be']

function passive(options) {
  var ignore = (options || {}).ignore || []
  var list = difference(patterns, ignore)

  return transformer

  // Search `tree` for violations.
  function transformer(tree, file) {
    search(tree, list, searcher)

    function searcher(match, index, parent, phrase) {
      var before = findBefore(parent, index, 'WordNode')
      var message

      if (!before) {
        return
      }

      before = toString(before).toLowerCase()

      if (verbs.indexOf(before) === -1) {
        return
      }

      message = file.message(
        'Don’t use the passive voice',
        {
          start: position.start(match[0]),
          end: position.end(match[match.length - 1])
        },
        phrase.replace(/\s+/g, '-').toLowerCase()
      )

      message.source = 'retext-passive'
      message.actual = toString(match)
      message.expected = null
    }
  }
}
