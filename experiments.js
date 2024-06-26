// WE WILL BE USING THE PROXY NOW
function notPrimitive(object) {
  return typeof object === "object" && object !== null;
}

function createContext(contextToInherit, allVariables) {
  return new Proxy({ ...contextToInherit }, handler);
}

const handler = {
  get: function (target, prop, receiver) {
    if (prop in target) {
      console.log(`Getting the value of ${prop} via handler`);
      return target[prop].value; // or some transformation of target[prop], if you want
    }
    return undefined; // return undefined if the property does not exist
  },

  set: function (target, prop, value) {
    console.log(`Setting the value of ${prop} to ${value}`);
    if (prop in target) {
      const variable = target[prop];
      variable.value = value;
      return true; // indicating that the assignment was successful
    }
    return undefined; // indicating that the assignment was not successful
  },
};

function createVariable(name, value, componentId, expression = null) {
  // if the value is not a primitive, we create a proxy for it
  if (notPrimitive(value)) {
    for (const key in value) {
      value[key] = createVariable(key, value[key], componentId);
    }

    const variable = {
      _value: new Proxy(value, handler),

      get value() {
        console.log(`Getting the value of variable vie Variable`);
        return this._value;
      },

      set value(value) {
        console.log(`Setting the value of variable vie Variable`);
        this._value = createVariable(name, value, componentId);
      },
    };

    return variable;
  }

  const variable = {
    name,
    componentId,
    expression,
    _value: value,
    _updated: false,
    dependentVariables: [],
    textNodes: [],
    inputNodes: [],

    get value() {
      console.log(`Getting the value of ${name}`);
      if (notPrimitive(this._value)) {
        return this._value.value;
      }
      return this._value;
    },

    set value(value) {
      this._value = value;
      this._updated = true;
    },
  };

  variable.raw = variable;
  return variable;
}

//// THIS IS OK
const name = createVariable("name", "Peter", 1);
console.log("name: ", name); // Logs: Getting the value of variable, then logs the value { name: "Peter", componentId: 1, expression: null, _value: "Peter", _updated: false, dependentVariables: [], textNodes: [], inputNodes: [], raw: { name: "Peter", componentId: 1, expression: null, _value: "Peter", _updated: false, dependentVariables: [], textNodes: [], inputNodes: [] } }
console.log("directly _value: ", name._value); // Logs: Getting the value of name, then logs the value "Peter"
console.log("directly value: ", name.value); // Logs: Getting the value of name, then logs the value "Peter"

name.textNodes = ["textNode1", "textNode2"];
name.textNodes.push("textNode3");

console.log("name.textNodes: ", name.textNodes); // Logs: Getting the value of textNodes, then logs the value ["textNode1", "textNode2", "textNode3"]

const user = createVariable("user", { name: "Peter", surname: "Jackson" }, 2);
const context = createContext({ user });

console.log("context.user:", context.user); // Logs: Getting the value of variable, then logs the value
console.log("context.user.name:", context.user.name); // Logs: Getting the value of variable, then logs the value

context.user.name = "Jane";
context.user.surname = "Doe";

console.log("context.user:", context.user); // Logs: Getting the value of variable, then logs the value
console.log("context.user.name:", context.user.name); // Logs: Getting the value of variable, then logss the value "Jane"

// const handler = {
//   get: function (target, prop, receiver) {
//     if (prop in target) {
//       console.log(`Getting the value of ${prop}`);
//       return target[prop].value; // or some transformation of target[prop], if you want
//     }
//     return undefined; // return undefined if the property does not exist
//   },
//   set: function (target, prop, value) {
//     console.log(`Setting the value of ${prop} to ${value}`);
//     const variable = target[prop];
//     variable.value = value;
//     return true; // indicating that the assignment was successful
//   },
// };

// function createContext(contextToInherit, allVariables) {
//   return new Proxy({ ...contextToInherit }, handler);
// }

// const initialObject = {
//   value: null,
//   updated: false,
//   deleted: false,
//   hidden: false,
//   updating: false,
//   expression: null,
//   componentId: null,
// };

// function createVariable(name, value, componentId, expression = null) {
//   const variable = {
//     ...initialObject,
//     name: name,
//     _value: value,
//     componentId: componentId,
//     expression: expression,
//     dependentVariables: [],
//     textNodes: [],
//     inputNodes: [],

//     get value() {
//       console.log(`Getting the value of ${name}`);
//       return this._value;
//     },

//     set value(value) {
//       this._value = value;
//       console.log(`Setting the value of ${name} to ${value}`);
//       this.updated = true;
//     },
//   };

//   return variable;
// }

// const user = createVariable("user", { name: "Peter", surname: "Jackson" }, 2);
// const context = createContext({ user });

// console.log("context.user:", context.user); // Logs: Getting the value of variable, then logs the value
// console.log("context.user.name:", context.user.name); // Logs: Getting the value of variable, then logs the value

// context.user.name = "Jane";
// context.user.surname = "Doe";

// console.log("context.user:", context.user); // Logs: Getting the value of variable, then logs the value
// console.log("context.user.name:", context.user.name); // Logs: Getting the value of variable, then logss the value "Jane"

// // // const name = createVariable("name", "Peter", 1);
// // // console.log("directly _value: ", name._value); // Logs: Getting the value of name, then logs the value "Peter"
// // // console.log("directly value: ", name.value); // Logs: Getting the value of name, then logs the value "Peter"

// // // const context = createContext({ name });
// // // console.log("via context 'name': ", context.name); // Logs: Getting the value of variable, then logs the value "Peter"
// // // console.log("");

// // // function changeVariable() {
// // //   console.log("BEFORE: ", this.name);
// // //   this.name = "Jane";
// // //   console.log("AFTER: ", this.name);
// // // }

// // // const boundChangeVariable = changeVariable.bind(context);

// // boundChangeVariable();
// // console.log("via context 'name' again: ", context.name); // Logs: Getting the value of variable, then logs the value "Peter"

// // const user = createVariable("user", { name: "Peter", surname: "Jackson" }, 2);
// // const context2 = createContext({ user });
// // console.log("via context 'user': ", context2.user); // Logs: Getting the value of variable, then logs the value { name: "Peter", surname: "Jackson" }
// // console.log("via context 'user.name': ", context2.user.name); // Logs: Getting the value of variable, then logs the value "Peter"

// // SOLVED BY BINDING AN OBJECT to

// // const methods = {};

// // function save(recursive = true) {
// //   console.log("Save " + recursive);
// //   if (recursive) {
// //     this.methods.change();
// //     this.methods.getData();
// //   }
// // }

// // const newSave = save.bind({ methods });

// // function change(recursive = true) {
// //   console.log("Change " + recursive);
// //   if (recursive) {
// //     this.methods.save(false);
// //     this.methods.getData();
// //   }
// // }

// // const newChange = change.bind({ methods });

// // function getData() {
// //   console.log("in getData");
// // }

// // methods.change = newChange;
// // methods.save = newSave;
// // methods.getData = getData;

// // methods.save();

// // // Object.defineProperty(save, "change", { value: change, writable: true });
// // // Object.defineProperty(save, "getData", { value: getData, writable: true });

// // // Object.defineProperty(change, "save", { value: save, writable: true });
// // // Object.defineProperty(change, "getData", { value: getData, writable: true });

// // // Object.defineProperty(getData, "save", { value: save, writable: true });
// // // Object.defineProperty(getData, "change", { value: change, writable: true });

// // Now you can call any function, and it will invoke the others
// // save(); // Output: Save, Change, Get Data

// // function firstName(givenName) {
// //   console.log(givenName);
// //   console.log(this);
// //   console.log(this.methods);
// // }

// // function wrapper(...args) {
// //   let methods = { hello: "hello" };
// //   firstName.call(...args, { name: "Albert 2", methods: { hello: "hello" } });
// // }

// // wrapper();

// // function getThis() {
// //   if (this) {
// //     console.log("Yes, I have 'this'");
// //     return this;
// //   } else {
// //     console.log("No, I don't have 'this'");
// //     return null;
// //   }
// // }

// // const boundFunction = getThis.bind({
// //   name: "Albert 2",
// //   methods: { hello: "hello" },
// // });

// // function wrapper2() {
// //   const thisValue = boundFunction();

// //   console.log("This of the function is: ", thisValue);
// //   thisValue.surname = "Einstein 333";
// //   console.log("New This of the function should be: ", thisValue);

// //   const newThisValue = boundFunction();
// //   console.log("New This of the function is actually: ", newThisValue);
// // }

// // wrapper2();

// // // Your prototype function with binding
// // const prototypeObject = {
// //   name: "Albert",
// //   surname: "Einstein",
// // };

// // // Function constructor that inherits from the prototype
// // function CustomFunction() {
// //   // Call the prototype function within the context of 'this'
// //   prototypeObject.call(this);
// // }

// // // Set up the prototype chain
// // CustomFunction.prototype = Object.create(prototypeObject.prototype);

// // // Create an instance of CustomFunction
// // const instance = new CustomFunction(); // Output: Hello, my name is Albert

// // class foo {
// //   constructor(func, ...args) {
// //     this.tellMyName = function () {
// //       console.log(this.myName);
// //     };
// //   }
// // }

// // class bar {

// // }

// // var fooObj1 = new foo("James");
// // fooObj1.tellMyName(); // will print Jamesvar fooObj2 = new foo('Mike');fooObj2.tellMyName(); // will print Mike

// const attributes = {
//   name: "Albert",
//   surname: "Einstein",
// };

// function firstNameFactory() {
//   // This is a closure that captures 'attributes'
//   return function () {
//     // console.log(this);
//     // console.log(this.name);
//   };
// }

// const newFunction = firstNameFactory().bind(attributes);

// newFunction();

// attributes.name = "Bella";
// attributes.surname = "Lestrange";

// newFunction();
