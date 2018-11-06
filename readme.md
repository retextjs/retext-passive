# retext-passive [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for passive voice with [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-passive
```

## Usage

Say we have the following file, `example.txt`:

```text
He was withheld while we were being fed.
```

And our script, `example.js`, looks like this:

```javascript
var vfile = require('to-vfile');
var report = require('vfile-reporter');
var unified = require('unified');
var english = require('retext-english');
var stringify = require('retext-stringify');
var passive = require('retext-passive');

unified()
  .use(english)
  .use(passive)
  .use(stringify)
  .process(vfile.readSync('example.txt'), function (err, file) {
    console.error(report(err || file));
  });
```

Now, running `node example` yields:

```text
example.txt
   1:8-1:16  warning  Don’t use the passive voice  withheld  retext-passive
  1:37-1:40  warning  Don’t use the passive voice  fed       retext-passive

⚠ 2 warnings
```

## API

### `retext().use(passive[, options])`

Check for passive voice.  No options.

###### `options.ignore`

`Array.<string>` — phrases _not_ to warn about.

## Related

*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — Check possible insensitive, inconsiderate language
*   [`retext-profanities`](https://github.com/retextjs/retext-profanities)
    — Check for profane and vulgar wording
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — Check phrases for simpler alternatives

## Contribute

See [`contributing.md` in `retextjs/retext`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/retextjs/retext-passive.svg

[travis]: https://travis-ci.org/retextjs/retext-passive

[codecov-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-passive.svg

[codecov]: https://codecov.io/github/retextjs/retext-passive

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[contributing]: https://github.com/retextjs/retext/blob/master/contributing.md

[coc]: https://github.com/retextjs/retext/blob/master/code-of-conduct.md
