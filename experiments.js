// SOLVED BY BINDING AN OBJECT to

// const methods = {};

// function save(recursive = true) {
//   console.log("Save " + recursive);
//   if (recursive) {
//     this.methods.change();
//     this.methods.getData();
//   }
// }

// const newSave = save.bind({ methods });

// function change(recursive = true) {
//   console.log("Change " + recursive);
//   if (recursive) {
//     this.methods.save(false);
//     this.methods.getData();
//   }
// }

// const newChange = change.bind({ methods });

// function getData() {
//   console.log("in getData");
// }

// methods.change = newChange;
// methods.save = newSave;
// methods.getData = getData;

// methods.save();

// // Object.defineProperty(save, "change", { value: change, writable: true });
// // Object.defineProperty(save, "getData", { value: getData, writable: true });

// // Object.defineProperty(change, "save", { value: save, writable: true });
// // Object.defineProperty(change, "getData", { value: getData, writable: true });

// // Object.defineProperty(getData, "save", { value: save, writable: true });
// // Object.defineProperty(getData, "change", { value: change, writable: true });

// Now you can call any function, and it will invoke the others
// save(); // Output: Save, Change, Get Data

// function firstName(givenName) {
//   console.log(givenName);
//   console.log(this);
//   console.log(this.methods);
// }

// function wrapper(...args) {
//   let methods = { hello: "hello" };
//   firstName.call(...args, { name: "Albert 2", methods: { hello: "hello" } });
// }

// wrapper();

// function getThis() {
//   if (this) {
//     console.log("Yes, I have 'this'");
//     return this;
//   } else {
//     console.log("No, I don't have 'this'");
//     return null;
//   }
// }

// const boundFunction = getThis.bind({
//   name: "Albert 2",
//   methods: { hello: "hello" },
// });

// function wrapper2() {
//   const thisValue = boundFunction();

//   console.log("This of the function is: ", thisValue);
//   thisValue.surname = "Einstein 333";
//   console.log("New This of the function should be: ", thisValue);

//   const newThisValue = boundFunction();
//   console.log("New This of the function is actually: ", newThisValue);
// }

// wrapper2();

// // Your prototype function with binding
// const prototypeObject = {
//   name: "Albert",
//   surname: "Einstein",
// };

// // Function constructor that inherits from the prototype
// function CustomFunction() {
//   // Call the prototype function within the context of 'this'
//   prototypeObject.call(this);
// }

// // Set up the prototype chain
// CustomFunction.prototype = Object.create(prototypeObject.prototype);

// // Create an instance of CustomFunction
// const instance = new CustomFunction(); // Output: Hello, my name is Albert

// class foo {
//   constructor(func, ...args) {
//     this.tellMyName = function () {
//       console.log(this.myName);
//     };
//   }
// }

// class bar {

// }

// var fooObj1 = new foo("James");
// fooObj1.tellMyName(); // will print Jamesvar fooObj2 = new foo('Mike');fooObj2.tellMyName(); // will print Mike

const attributes = {
  name: "Albert",
  surname: "Einstein",
};

function firstNameFactory() {
  // This is a closure that captures 'attributes'
  return function () {
    // console.log(this);
    // console.log(this.name);
  };
}

const newFunction = firstNameFactory().bind(attributes);

newFunction();

attributes.name = "Bella";
attributes.surname = "Lestrange";

newFunction();
