# retext-passive

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to check for passive voice.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(retextPassive[, options])`](#unifieduseretextpassive-options)
*   [Messages](#messages)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin to check for the passive
voice.
It checks for certain verbs (`'am'`, `'are'`, `'were'`, `'being'`, `'is'`,
`'been'`, `'was'`, or `'be'`), followed by a word in [`list.js`][list].

## When should I use this?

You can opt-into this plugin when you’re dealing with content that might contain
weak language, and have authors that can fix that content.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

```sh
npm install retext-passive
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextPassive from 'https://esm.sh/retext-passive@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextPassive from 'https://esm.sh/retext-passive@4?bundle'
</script>
```

## Use

Say our document `example.txt` contains:

```txt
He was withheld while we were being fed.
```

…and our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import retextEnglish from 'retext-english'
import retextPassive from 'retext-passive'
import retextStringify from 'retext-stringify'

const file = await unified()
  .use(retextEnglish)
  .use(retextPassive)
  .use(retextStringify)
  .process(await read('example.txt'))

console.error(reporter(file))
```

…now running `node example.js` yields:

```txt
example.txt
   1:8-1:16  warning  Don’t use the passive voice  withheld  retext-passive
  1:37-1:40  warning  Don’t use the passive voice  fed       retext-passive

⚠ 2 warnings
```

## API

This package exports no identifiers.
The default export is `retextPassive`.

### `unified().use(retextPassive[, options])`

Check for the passive voice.

##### `options`

Configuration (optional).

###### `options.ignore`

Phrases *not* to warn about (`Array<string>`).

## Messages

Each message is emitted as a [`VFileMessage`][vfile-message] on `file`, with
the following fields:

###### `message.source`

Name of this plugin (`'retext-passive'`).

###### `message.ruleId`

Any word in [`list.js`][list].

###### `message.actual`

Current not ok phrase (`string`).

###### `message.expected`

Empty array to signal that `actual` should be removed (`[]`).

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Options`.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — check possible insensitive, inconsiderate language
*   [`retext-profanities`](https://github.com/retextjs/retext-profanities)
    — check for profane and vulgar wording
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — check phrases for simpler alternatives

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-passive/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-passive/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-passive.svg

[coverage]: https://codecov.io/github/retextjs/retext-passive

[downloads-badge]: https://img.shields.io/npm/dm/retext-passive.svg

[downloads]: https://www.npmjs.com/package/retext-passive

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-passive.svg

[size]: https://bundlephobia.com/result?p=retext-passive

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[retext]: https://github.com/retextjs/retext

[vfile-message]: https://github.com/vfile/vfile-message

[list]: list.js
