type FlattenedArray<T> = T extends ReadonlyArray<infer U> ? FlattenedArray<U> : T;

type NestedArray<T> = ReadonlyArray<T | NestedArray<T>>;

function flatten(input: NestedArray<number>): FlattenedArray<unknown>[] {
  return input.flat(3);
}

const nestedArray: NestedArray<number> = [[0, 1], 2, [[3]]];
console.log(nestedArray);
console.log(flatten(nestedArray));