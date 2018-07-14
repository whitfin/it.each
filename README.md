# it.each

[![Build Status](https://travis-ci.org/whitfin/it.each.svg?branch=master)](https://travis-ci.org/whitfin/it.each)

- [Setup](#setup)
- [Integration](#integration)
- [How Does It Work?](#example-usage)
- [Context](#context)
- [Synchronicity](#synchronicity)
- [Issues](#issues)

This module provides a way to use asynchronous loops alongside Mocha via a simple extension of the `it` handler. This works as of Mocha v2.1.0, and I would imagine it would continue to work in future against all versions, but no promises. In terms of compatibility, `it.each` is built on [TravisCI](https://travis-ci.org/whitfin/it.each) after every commit using Node v0.8.x, 0.10.x, 0.12.x. In addition to this, the latest version of io.js is also covered in these builds. Build results are submitted to [Code Climate](https://codeclimate.com/github/whitfin/it.each) for analysis.

The current version is below v1.0.0 so the potential does exist for breaking changes, however this will be avoided where possible. The reason this module remains below the v1.0.0 tag is because there is no clear roadmap; meaning implementation may have to change at some point.

### Setup ###

`it.each` is available on [npm](https://www.npmjs.com/package/it-each), so simply install it:

```
$ npm install it-each
```

### Integration ###

The idea of this method is to stay simple. Simply require in this module **after** you have instantiated Mocha (or any time if you're running with the mocha command line), and before you use an `it.each` loop. If you wish to have a separate test listing for each iteration, include an options object containining `testPerIteration` set to `true`.

```
require('it-each')();

require('it-each')({ testPerIteration: true });
```

This will enable `it.each()` for use in your testing. You are able to call the module again if you want to update any settings, for example if one suite requires a test per iteration and a different suite does not.

If testPerIteration is either unset or `false`, the `timeout` and `slow` values of the tests are multiplied by the number of elements in the array in order to avoid hitting Mocha timeouts unnecessarily. In addition, the test name is appended with a tracking value (`- 1/X`) to provide additional context should a failure occur. This ensures that common code per tests does not remove the ability to calculate which set of values is causing an issue.

### Example Usage ###

There are two different ways you can use `it.each`; with dynamic titles, and with static titles. Dynamic is better if you're intending to track your tests through the loop, whereas static is very similar to just putting an async loop inside your call to the usual `it`. There are examples inside the `test/` directory, with both methods of titling - however here are the signatures you can use, and an explanation of how it works:

**Dynamic**

```
it.each(iterable, title, fields, process);
```

Here is what the above translates to:

```
* iterable - the array you're going to iterate through
* title    - the title your tests will use, in a formattable way. E.g. "Test #%d"
* fields   - an array of keys to extract from each element to use to format the above title
* process  - the processing to run on each element in the iterable
```

Your `process` function will be provided with two parameters as follows:

```
it.each([], "My test", function(element, next){
    // where element is the current array index value
});
```
Please note that you only need call and use `next` if your function is asynchronous. If your function is synchronous, you can safely omit it. Be aware though, if `next` is specified in your parameters, you **must** call it to continue.


Here is an example of a title/fields combination.

```
var examples = [{ 'example' : 1, 'nested.example' : 2, 'inner' : { 'nest' : 3 } }];

// Your test title will extract the fields and result in: 'Example 1 with key 2 and nest 3'
it.each(examples, 'Example %s with key %s and nest %s', ['example', 'nested.example', 'inner.nest'], ...);
```

There are two reserved 'keywords' you can pass to the fields array, `x` and `element`. In this case, `x` will represent the iteration number the current test is on (starting at 0, so as to keep in track with the array), and `element` will be the element in the current processing loop.

As of v0.3.1, full forms of dot notation are supported in keys, by way of [dot-notes](https://www.npmjs.com/package/dot-notes). Feel free to provide special keys and array indices for use in formatting.

**Static**

Static is basically the same as just calling `it` over and over again with different values in the closure. This provides an easy shorthand to create tests from existing values. The signature of static titling is the same as that of dynamic, except with the omission of the `fields` parameter.

**Skip**

When developing a test it is sometimes useful to be able to skip all other tests in the suite. This may be done by using `it.each.skip`.

### Context ###

As of version v0.3.0 the context of the `it` is provided to the executed function in order to allow setting both `slow` and `timeout` from within the executed function. This is a potentially breaking change, however I doubt anybody was using `this` in the current version since it provided no additional context.

### Synchronicity ###

Again, as of v0.3.0 you now have the ability to execute a loop synchronously or asynchronously. Previously there was an unstated requirement to call the callback provided to the executed function, which does not fit with the Mocha stylings. In order to resolve this, your function will be run synchronously unless you ask for the callback to be passed in (e.g. by declaring it in your parameters). Should the callback be provided to your function, it must be called in order to finish the test.

### Issues ###

If you find any issues inside this module, feel free to open an issue [here](https://github.com/whitfin/it.each/issues "it.each Issues").
