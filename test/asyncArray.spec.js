import AsyncArray from '../src/index';

describe('AsyncArray', () => {
  const genericGenerator = (i) => i + 1;
  describe('Structure', () => {
    it('Should be able to instance an async array', () => {
      const generator = () => {};
      AsyncArray(generator);
    });

    it('Should be instance of array', () => {
      expect(AsyncArray(genericGenerator)).toBeInstanceOf(Array);
    });
  });

  describe('Behavior', () => {
    it('Should set a promise when a non-accessed position is accesed', () => {
      const asyncArray = AsyncArray(genericGenerator);
      expect(asyncArray[0]).toBeInstanceOf(Promise);
    });

    it('Should be able to await the promise setted at the accessed index', async () => {
      const asyncArray = AsyncArray(genericGenerator);
      const result = await asyncArray[0];
      expect(result).toBe(1);
    });

    it("Should set the resolved value it's corresponding position", async () => {
      const asyncArray = AsyncArray(genericGenerator);
      asyncArray[0];
      expect(asyncArray[0]).toBeInstanceOf(Promise);
      await asyncArray[0];
      expect(asyncArray[0]).toBe(1);
    });

    it("Should have the length of the biggest index that's been get", () => {
      const generator = (i) => i + 1;
      const asyncArray = AsyncArray(generator);
      expect(asyncArray.length).toBe(0);
      asyncArray[150];
      expect(asyncArray.length).toBe(151);
      asyncArray[456];
      expect(asyncArray.length).toBe(457);
    });

    describe("Should resolve all it's promise-values when called with", () => {
      const getPromisedArray = () => {
        const asyncArray = AsyncArray(genericGenerator);
        asyncArray[0];
        asyncArray[1];
        asyncArray[2];
        return asyncArray;
      };

      it('Promise.all', async () => {
        const asyncArray = getPromisedArray();
        const result = await Promise.all(asyncArray);
        expect(result).toEqual([1, 2, 3]);
        expect(asyncArray.length).toBe(3);
        expect(asyncArray[3]).toBeInstanceOf(Promise);
      });

      it('Promise.allSettled', async () => {
        const asyncArray = getPromisedArray();
        const result = await Promise.allSettled(asyncArray);
        expect(result).toEqual([
          { status: 'fulfilled', value: 1 },
          { status: 'fulfilled', value: 2 },
          { status: 'fulfilled', value: 3 },
        ]);
        expect(asyncArray.length).toBe(3);
        expect(asyncArray[3]).toBeInstanceOf(Promise);
      });
    });

    it('Should support expected methods', () => {
      const supportedArrayMethods = [
        'map',
        'filter',
        'reduce',
        'forEach',
        'find',
        'findIndex',
      ];

      const asyncArray = AsyncArray(genericGenerator);
      supportedArrayMethods.forEach((method) => {
        expect(asyncArray[method]).toBeInstanceOf(Function);
      });
    });

    describe("array pure methods shouldn't mutate the array and should return a  instance if expected", () => {
      let asyncArray;
      beforeAll(async () => {
        const instance = AsyncArray(genericGenerator);
        instance[0];
        instance[1];
        instance[56];
        await Promise.all(instance);
        asyncArray = instance;
      });

      it('Should _map_ as an array ', async () => {
        const result = asyncArray.map((v) => v + 1);
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toEqual(57);
        expect(result[0]).toEqual(2);
        expect(result[1]).toEqual(3);
        expect(result[56]).toEqual(58);
      });

      it('Should _filter_ as an array ', () => {
        const result = asyncArray.filter((v) => v < 3);
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toEqual(2);
        expect(result[0]).toEqual(1);
        expect(result[1]).toEqual(2);
      });

      it('Should _reduce_ as an array ', async () => {
        const instance = AsyncArray(genericGenerator);
        instance[0];
        instance[1];
        instance[2];
        await Promise.all(instance);
        const result = instance.reduce((acc, v) => acc + v, 0);
        expect(typeof result).toEqual('number');
        expect(result).toEqual(6);
      });

      it('Should _forEach_ as an array ', () => {
        const result = asyncArray.forEach((v) => v + 1);
        expect(result).toBeUndefined();
      });

      it('Should _find_ as an array ', () => {
        const result = asyncArray.find((v) => v === 3);
        expect(result).toEqual(3);
      });

      it('Should _findIndex_ as an array ', () => {
        const result = asyncArray.findIndex((v) => v === 3);
        expect(result).toEqual(2);
      });
    });

    describe('Should support special methods', () => {
      it('Should set undefined to an index when called wipeIndex', async () => {
        const asyncArray = AsyncArray(genericGenerator);
        await asyncArray[1];
        expect(asyncArray[1]).toBe(2);
        asyncArray.wipeIndex(1);
        expect(asyncArray[1]).toBeInstanceOf(Promise);
      });

      it('Should empty the whole array when called wipe', async () => {
        const asyncArray = AsyncArray(genericGenerator);
        await asyncArray[1];
        expect(asyncArray[1]).toBe(2);
        expect(asyncArray.length).toBe(2);

        asyncArray.wipe();
        expect(asyncArray.length).toEqual(0);
      });

      it('Should return a  instance of AsyncArray when called clone', async () => {
        const asyncArray = AsyncArray(genericGenerator);
        await asyncArray[1];
        const clonedArray = asyncArray.clone();
        expect(clonedArray).toBeInstanceOf(Array);
        expect(clonedArray).not.toBe(asyncArray);
        expect(clonedArray.length).toBe(2);
        expect(clonedArray[1]).toBe(2);
      });

      it('Should throw if trying to set the value of an index externally', () => {
        const asyncArray = AsyncArray(genericGenerator);
        expect(() => {
          asyncArray[0] = 1;
        }).toThrow();
      });
    });
  });
});
