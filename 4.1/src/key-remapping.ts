type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type Protected<T> = Getters<T> & Setters<T>;

interface Dog {
  name: string;
  age: number;
  favoriteToy: string;
}

// Using the base type of dog but essentially taking all
// properties out and replacing it with getters and setters
type SafeDog = Protected<Dog>;

let _age = 1;
let _favoriteToy = "chewy toy";
let _name = "Ruff";

const safeDog: SafeDog & { logProperties: () => void } = {
  logProperties: () => console.log(_age, ' | ',  _name, ' | ',  _favoriteToy),
  getAge: () => _age,
  getFavoriteToy: () => _favoriteToy,
  getName: () => _name,
  setAge: (value) => _age = value,
  setFavoriteToy: (value) => _favoriteToy = value,
  setName: (value) => _name = value,
};
safeDog.logProperties();
safeDog.setAge(100);
safeDog.setName("Ruff ruff");
safeDog.logProperties();