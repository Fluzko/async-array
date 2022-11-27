# async-array

[![tests](https://img.shields.io/github/workflow/status/fluzko/async-array/Testing?label=Tests)]()
[![npm](https://img.shields.io/npm/v/@fluzko/async-array)](https://www.npmjs.com/package/@fluzko/async-array)

A simple `array` wrapper that allows you to interact with `async` content and self manageable promise resolution by passing an async generator function.

## Usage

```js
const generator = (i) => i + 1; // this can be any async function, ie an API call
const asyncArray = AsyncArray(generator);
asyncArray[0]; // This will set a promise at index 0
await asyncArray[0]; // This will resolve the promise to 1
```

## Suported methods

### Array methods

Since it should behave as much as possible like an array, the following methods are supported:

- map
- filter
- reduce
- forEach
- find
- findIndex
- length

take in count that this methods will return a new common `array`, not an `AsyncArray`.

### Special methods

- <u>wipe:</u> this will empty the async array, and will set the length to 0
- <u>wipeIndex:</u> this will empty the async array at the given index
- <u>clone:</u> this will return a new AsyncArray with the same generator function

## Contributing

Contributions are always welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)
