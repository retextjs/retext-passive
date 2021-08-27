/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Word} Word
 *
 * @typedef Options
 *   Configuration.
 * @property {string[]} [ignore]
 *   Phrases *not* to warn about.
 */

import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {findBefore} from 'unist-util-find-before'
import {pointStart, pointEnd} from 'unist-util-position'
import {list} from './list.js'

const source = 'retext-passive'

const verbs = new Set(['am', 'are', 'were', 'being', 'is', 'been', 'was', 'be'])

/**
 * Plugin to check for passive voice.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
export default function retextPassive(options = {}) {
  const ignore = options.ignore || []
  const phrases =
    ignore.length > 0 ? list.filter((d) => !ignore.includes(d)) : list

  return (tree, file) => {
    search(tree, phrases, (match, index, parent, phrase) => {
      const before = /** @type {Word} */ (findBefore(parent, index, 'WordNode'))

      if (!before || !verbs.has(toString(before).toLowerCase())) {
        return
      }

      Object.assign(
        file.message(
          'Don’t use the passive voice',
          {start: pointStart(match[0]), end: pointEnd(match[match.length - 1])},
          [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
        ),
        {actual: toString(match), expected: []}
      )
    })
  }
}
