it.each
=======

- [Setup](#setup)
- [Example Usage](#usage)
- [How Does It Work?](#explanations)
- [Generic Loops](#generic-looping)
- [Issues](#issues)

This module provides a way to use asynchronous loops alongside Mocha via a simple extension of the `it` handler. This works as of Mocha v1.20.0, and I would imagine it would continue to work in future against all versions, but no promises.

### Setup ###

For now, you can just install this module from this repo:

```
$ npm install it-each
```

### Usage ###

The idea of this method is to stay simple. Simply require in this module **after** you have instantiated Mocha, and before you use an `it.each` loop. If you wish to have a separate test listing for each iteration, include an options object containining `testPerIteration` set to `true`.

```
require('it-each')();

require('it-each')({ testPerIteration: true });
```

This will enable `it.each()` for use in your testing. There are two different ways you can use `it.each`, one with dynamic titles, and one with static titles. Dynamic is better if you're intending to track your tests through the loop, whereas static is very similar to just putting an async loop inside your call to the usual `it`.

### Explanation ###

There are example files inside the `examples/` directory, with both methods of titling, however here are the signatures you can use, and an explanation of how it works:

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

Here is an example of a title/fields combination.

```
var examples = [{ 'example' : 1, 'nested.example' : 2 }];

// Your test title will extract the fields and result in a title of 'Example 1 with nest 2'
it.each(examples, 'Example %s with nest %s', ['example', 'nested.example'], ...);
```

There are two reserved keywords you can pass to the fields array, `'x'` and `'element'`. In this case, `x` will represent the iteration number the current test is on, and `element` will be the entire element in the current processing loop.

**Static**

Static is basically the same as just calling `it`, however the main difference is that you would have to place a new timeout inside your own it if you were to loop inside, however this is taken care of via `it.each`. In the case of a timeout being 2000ms, and an `it.each` loop existing of 6 element, the timeout of the loop will be set to 12s, a.k.a 2000ms * 6.

### Generic Looping ###

You can just loop a chain of tests together following the static implementation like this:

```
it.each(new Array(15), "My test", function(element, next){
    // Loops this block 15 times, just ignore the element parameter
});
```

### Issues ###

If you find any issues inside this module, feel free to open an issue [here](https://github.com/iwhitfield/expansion-js/issues "ExpansionJS Issues").