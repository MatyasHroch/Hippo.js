// import { registerHandlers } from "./emitter.js";
import { emitter } from "./emitter.js";

/**
 * Adds the component slots to the method to access them via 'this'.
 * @param {Function} method
 * @param {InnerComponent} component
 * @returns {Function} The  method.
 */
function createMethod(method, component, dataToBind) {
  if (!method) console.error("Method is not defined.");
  if (!component) console.error("Component is not defined.");

  if (!dataToBind) {
    dataToBind = {
      // !!!!!! TRY THIS !!!!!!!
      emitter,
      // !!!!!! TRY THIS !!!!!!!
      ...component.vars,
      ...component.methods,
      ...component.props,
      id: component.id,
      component: component,
    };
  }

  const boundedFunction = method.bind(dataToBind);

  return boundedFunction;
}

/**
 * @param {Object<string,Function>} methods
 * @returns {Object<string,Function>} The methods.
 */
function createMethods(methods, component) {
  const methodsObj = {};

  // TODO check if the method is a function
  // TODO check if the method has other methods in the 'this' context

  const dataToBind = createObjToBind(component);

  for (const name in methods) {
    methodsObj[name] = createMethod(methods[name], component, dataToBind);
  }

  for (const functionName in methodsObj) {
    dataToBind[functionName] = methodsObj[functionName];
  }

  // for (const functionName in methodsObj) {
  //   for (const otherFunctionName in methodsObj) {
  //     const func = methodsObj[functionName];
  //     const otherFunc = methodsObj[otherFunctionName];

  //     func[otherFunctionName] = otherFunc;
  //   }
  // }

  return methodsObj;
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

  // console.log("component.vars", component.vars);

  for (const varName in component.vars) {
    const variable = component.vars[varName];
    // console.log("variable:", variable);

    // console.log("variable.name:", variable.name);

    Object.defineProperty(result, variable.name, {
      get: function () {
        return variable.value;
      },

      set: function (value) {
        variable.set(value);
      },
    });
  }
  console.log({ result });

  return result;
}

export { createMethods, createMethod };
