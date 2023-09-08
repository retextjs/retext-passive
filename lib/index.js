/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {ReadonlyArray<string> | null | undefined} [ignore]
 *   Phrases *not* to warn about (optional).
 */

import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {findBefore} from 'unist-util-find-before'
import {pointEnd, pointStart} from 'unist-util-position'
import {list} from './list.js'

/** @type {Readonly<Options>} */
const emptyOptions = {}
/** @type {ReadonlyArray<never>} */
const emptyIgnore = []

const verbs = new Set(['am', 'are', 'were', 'being', 'is', 'been', 'was', 'be'])

/**
 * Check for passive voice.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function retextPassive(options) {
  const settings = options || emptyOptions
  const ignore = settings.ignore || emptyIgnore
  const phrases =
    ignore.length > 0
      ? list.filter(function (d) {
          return !ignore.includes(d)
        })
      : [...list]

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree, file) {
    search(tree, phrases, function (match, index, parent, phrase) {
      const before = findBefore(parent, index, 'WordNode')

      if (!before || !verbs.has(toString(before).toLowerCase())) {
        return
      }

      const start = pointStart(match[0])
      const end = pointEnd(match[match.length - 1])

      const message = file.message('Unexpected use of the passive voice', {
        ancestors: [parent],
        /* c8 ignore next -- hard to test */
        place: start && end ? {start, end} : undefined,
        source: 'retext-passive',
        ruleId: phrase.replace(/\s+/g, '-').toLowerCase()
      })

      message.actual = toString(match)
      message.expected = []
      message.url = 'https://github.com/retextjs/retext-passive#readme'
    })
  }
}
