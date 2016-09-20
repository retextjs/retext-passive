# retext-passive [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for passive voice with [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-passive
```

## Usage

```js
var retext = require('retext');
var passive = require('retext-passive');
var report = require('vfile-reporter');

retext()
  .use(passive)
  .process('He was withheld while we were being fed.', function (err, file) {
    console.error(report(err || file));
  });
```

Yields:

```txt
   1:8-1:16  warning  Don’t use the passive voice  withheld  retext-passive
  1:37-1:40  warning  Don’t use the passive voice  fed       retext-passive

⚠ 2 warnings
```

## API

### `retext().use(passive)`

Check for passive voice.  No options.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-passive.svg

[travis]: https://travis-ci.org/wooorm/retext-passive

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-passive.svg

[codecov]: https://codecov.io/github/wooorm/retext-passive

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext
