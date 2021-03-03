function logShape(shape: "circle" | "square" | "triangle") {
  console.log(shape);
}

// String literal type causes error because of misspelling
// logShape('circel');

// Only accepts valid input and autocomplete works nicely:
logShape("circle");

// This can also be used for composition of more complex types, 
// and this can be written per property as well, but that takes more space.
type PersonDescription = {
  [K in "hasBeard" | "hasGlasses" | "hasHat"]: boolean;
}

const personDescription: PersonDescription = {
  hasBeard: true,
  hasGlasses: false,
  hasHat: true
};

// Now for the new stuff: Template Literal Types

type World = 'World';
type Greeting = `Hello ${World}`;
// Greeting's type is "Hello World"

type HorizontalAlignment = "left" | "center" | "right";
type VerticalAlignment = "top" | "middle" | "bottom";
type Alignment = `${VerticalAlignment}-${HorizontalAlignment}`;
// Alignment's type is a combination of every horizontal alignment with every vertical alignment
// Ranging from top-left to bottom-right

function logAlignment(alignment: Alignment) {
  console.log(alignment);
}

// Doesn't work because of typoo
// logAlignment("top-rihgt");

// Works because it matches the types
logAlignment("middle-center");


interface Person {
  name: string;
  age: number;
  location: string;
}

const person: Person = {
  name: "Peter",
  age: 42,
  location: "Quahog"
}

type PropEventSource<T> = {
  on<K extends string & keyof T>(eventName: `${K}Changed`, callback: (value: T[K]) => void): void;
}

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;
// As makeWatchedObject is not defined, this code is commented out
// This will use type inference to determine that this is a person,
// and that type will also be used for the PropEventSource interface
// const watchedPerson = makeWatchedObject(person);

// This doesn't work because doesNotWork is not a property of interface Person
// watchedPerson.on("doesNotWorkChanged", () => console.log("age changed"));

// This works because age is a property of interface Person. More type inference 
// causes us to know for sure that age is of type number here.
// watchedPerson.on("ageChanged", (age) => age > 50 && console.log(`${age} is above 50`));

