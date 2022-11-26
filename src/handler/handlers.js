// eslint-disable-next-line import/no-cycle
import AsyncArray from '..';

const supportedArrayMethods = [
  'map',
  'filter',
  'reduce',
  'forEach',
  'find',
  'findIndex',
  'length',
];

const specialMethods = {
  wipeIndex: (target) => (i) => {
    target[i] = undefined;
  },
  wipe: (target) => () => {
    target.length = 0;
  },
  clone: (target, generator) => () => AsyncArray(generator, target),
};

const arrayMethod = {
  match: (prop) =>
    supportedArrayMethods.includes(prop) || typeof prop === 'symbol',
  handle: (target, prop) => target[prop],
};

const specialMethod = {
  match: (prop) => !!specialMethods[prop],
  handle: (target, prop, generator) => specialMethods[prop](target, generator),
};

const indexAccess = {
  match: (prop) => Number.isSafeInteger(+prop),
  handle: (target, prop, generator) => {
    const i = +prop;
    if (target[i] === undefined) {
      target[i] = new Promise((resolve) => {
        resolve(generator(i));
      }).then((v) => {
        target[i] = v;
        return v;
      });
    }

    return target[i];
  },
};

export default [arrayMethod, specialMethod, indexAccess];
