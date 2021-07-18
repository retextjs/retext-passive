import difference from 'lodash.difference'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {findBefore} from 'unist-util-find-before'
import {pointStart, pointEnd} from 'unist-util-position'
import {list} from './list.js'

var source = 'retext-passive'

var verbs = ['am', 'are', 'were', 'being', 'is', 'been', 'was', 'be']

export default function retextPassive(options) {
  var ignore = (options || {}).ignore || []
  var phrases = difference(list, ignore)

  return transformer

  // Search `tree` for violations.
  function transformer(tree, file) {
    search(tree, phrases, searcher)

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
        {start: pointStart(match[0]), end: pointEnd(match[match.length - 1])},
        [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
      )

      message.actual = toString(match)
      message.expected = []
    }
  }
}
