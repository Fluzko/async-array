import AsyncArrayException from './asyncArrayException';

const getHandler = (generator) => ({
  get: (target, prop) => {
    const supportedArrayMethods = [
      'map',
      'filter',
      'reduce',
      'forEach',
      'find',
      'findIndex',
      'length',
    ];
    if (supportedArrayMethods.includes(prop) || typeof prop === 'symbol') {
      return target[prop];
    }

    const specialMethods = {
      wipeIndex: (i) => {
        target[i] = undefined;
      },
      wipe: () => {
        target.length = 0;
      },
      clone: () => AsyncArray(generator, target),
    };
    if (specialMethods[prop]) return specialMethods[prop];

    const i = Number(prop);
    if (Number.isSafeInteger(i)) {
      if (target[i] === undefined) {
        target[i] = new Promise((resolve) => {
          resolve(generator(i));
        }).then((v) => {
          target[i] = v;
          return v;
        });
      }

      return target[i];
    }

    throw new AsyncArrayException(`Property ${prop} is not supported`);
  },
});

const AsyncArray = (generator, initial = []) => {
  if (typeof generator !== 'function')
    throw new AsyncArrayException('Generator must be a function');
  if (!Array.isArray(initial))
    throw new AsyncArrayException('Initial value must be an array');

  return new Proxy([...initial], getHandler(generator));
};

export default AsyncArray;
