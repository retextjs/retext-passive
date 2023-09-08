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
    *   [`Options`](#options)
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
`'been'`, `'was'`, or `'be'`), followed by a word in [`list.js`][file-list].

## When should I use this?

You can opt-into this plugin when you’re dealing with content that might contain
weak language, and have authors that can fix that content.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

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

…and our module `example.js` contains:

```js
import retextEnglish from 'retext-english'
import retextPassive from 'retext-passive'
import retextStringify from 'retext-stringify'
import {read} from 'to-vfile'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'

const file = await unified()
  .use(retextEnglish)
  .use(retextPassive)
  .use(retextStringify)
  .process(await read('example.txt'))

console.error(reporter(file))
```

…then running `node example.js` yields:

```txt
example.txt
1:8-1:16  warning Unexpected use of the passive voice withheld retext-passive
1:37-1:40 warning Unexpected use of the passive voice fed      retext-passive

⚠ 2 warnings
```

## API

This package exports no identifiers.
The default export is [`retextPassive`][api-retext-passive].

### `unified().use(retextPassive[, options])`

Check for the passive voice.

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `ignore` (`Array<string>`, optional)
    — phrases *not* to warn about

## Messages

Each message is emitted as a [`VFileMessage`][vfile-message] on `file`, with
`source` set to `'retext-passive'`, `ruleId` to any word in
[`list.js`][file-list], `actual` to the unexpected phrase, and `expected` to an
empty array.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `retext-passive@^5`,
compatible with Node.js 16.

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

[size-badge]: https://img.shields.io/bundlejs/size/retext-passive

[size]: https://bundlejs.com/?q=retext-passive

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

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[vfile-message]: https://github.com/vfile/vfile-message

[file-list]: lib/list.js

[api-options]: #options

[api-retext-passive]: #unifieduseretextpassive-options
