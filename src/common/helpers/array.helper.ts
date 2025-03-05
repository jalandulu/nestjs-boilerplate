export namespace Array {
  export function compareArrays<T>(array1: T[], array2: T[]) {
    return {
      used: array1.filter((item1) => array2.some((item2) => item2 === item1)),
      unused: array1.filter((item1) => !array2.some((item2) => item2 === item1)),
    };
  }
}
