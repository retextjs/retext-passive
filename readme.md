# retext-passive

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**retext**][retext] plugin to check for passive voice.

## Install

[npm][]:

```sh
npm install retext-passive
```

## Use

Say we have the following file, `example.txt`:

```txt
He was withheld while we were being fed.
```

…and our script, `example.js`, looks like this:

```js
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var english = require('retext-english')
var stringify = require('retext-stringify')
var passive = require('retext-passive')

unified()
  .use(english)
  .use(passive)
  .use(stringify)
  .process(vfile.readSync('example.txt'), function(err, file) {
    console.error(report(err || file))
  })
```

Now, running `node example` yields:

```txt
example.txt
   1:8-1:16  warning  Don’t use the passive voice  withheld  retext-passive
  1:37-1:40  warning  Don’t use the passive voice  fed       retext-passive

⚠ 2 warnings
```

## API

### `retext().use(passive[, options])`

Check for passive voice.

###### `options.ignore`

Phrases *not* to warn about (`Array.<string>`).

### Messages

Each message is emitted as a [`VFileMessage`][message] on `file`, with the
following fields:

###### `message.source`

Name of this plugin (`'retext-passive'`).

###### `message.ruleId`

Any word in [`list.json`][list].

###### `message.actual`

Current not ok phrase (`string`).

###### `message.expected`

Empty array to signal that `actual` should be removed (`[]`).

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — Check possible insensitive, inconsiderate language
*   [`retext-profanities`](https://github.com/retextjs/retext-profanities)
    — Check for profane and vulgar wording
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — Check phrases for simpler alternatives

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

[build-badge]: https://img.shields.io/travis/retextjs/retext-passive.svg

[build]: https://travis-ci.org/retextjs/retext-passive

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-passive.svg

[coverage]: https://codecov.io/github/retextjs/retext-passive

[downloads-badge]: https://img.shields.io/npm/dm/retext-passive.svg

[downloads]: https://www.npmjs.com/package/retext-passive

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-passive.svg

[size]: https://bundlephobia.com/result?p=retext-passive

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/master/contributing.md

[support]: https://github.com/retextjs/.github/blob/master/support.md

[coc]: https://github.com/retextjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[message]: https://github.com/vfile/vfile-message

[list]: list.json
