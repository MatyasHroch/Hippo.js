// import { registerHandlers } from "./emitter.js";
import { emitter } from "./emitter.js";

/**
 * Adds the component slots to the method to access them via 'this'.
 * @param {Function} method
 * @param {InnerComponent} component
 * @returns {Function} The  method.
 */
function createMethod(method, dataToBind) {
  if (!method) console.error("Method is not defined.");
  if (!dataToBind) console.error("Data to bind not provided");

  const boundedFunction = method.bind(dataToBind);

  return boundedFunction;
}

/**
 * @param {Object<string,Function>} methods
 * @returns {Object<string,Function>} The methods.
 */
function createMethods(component, methods, dataToBind = null) {
  const resultMethods = {};

  // TODO check if the method is a function
  // TODO check if the method has other methods in the 'this' context
  if (!dataToBind) {
    dataToBind = createObjToBind(component);
  }

  for (const name in methods) {
    if (name == "someEvent") {
      console.log("bind object before the crating function");
      console.log({ dataToBind });
    }
    resultMethods[name] = createMethod(methods[name], dataToBind);
  }

  // for (const functionName in resultMethods) {
  //   dataToBind[functionName] = resultMethods[functionName];
  // }

  // for (const functionName in resultMethods) {
  //   for (const otherFunctionName in resultMethods) {
  //     const func = resultMethods[functionName];
  //     const otherFunc = resultMethods[otherFunctionName];

  //     func[otherFunctionName] = otherFunc;
  //   }
  // }

  return resultMethods;
}

/**
 * Creates an object to bind to the methods.
 * @param {InnerComponent} component
 * @returns {Object<string,any>} The object to bind.
 */

function createObjToBind(component) {
  const result = {
    ...component.vars,
    ...component.props,
    ...component.methods,
    emitter,
    id: component.id,
    component: component,
  };

  // for (const varName in component.vars) {
  //   const variable = component.vars[varName];

  //   // Object.defineProperty(result, variable.name, {
  //   //   get: function () {
  //   //     return variable.value;
  //   //   },

  //   //   set: function (value) {
  //   //     variable.set(value);
  //   //   },
  //   // });
  // }
  // console.log({ result });

  return result;
}

export { createMethods, createMethod };
