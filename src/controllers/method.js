import { createEmitMethods, createHandleMethod } from "./emitter.js";

/**
 * Adds the component slots to the method to access them via 'this'.
 * @param {Function} method
 * @param {InnerComponent} component
 * @returns {Function} The  method.
 */
function createMethod(method, component) {
  if (!method) console.error("Method is not defined.");
  if (!component) console.error("Component is not defined.");

  const printThis = method.name == "emitSomeEvent";

  function newFunction(...arg) {
    method.call(this, ...arg);
  }

  const dataToBind = {
    ...component.vars,
    ...component.props,
    ...component.methods,
    id: component.id,
    component: component,
  };

  // TODO bind the emit function to the component, with the emit name and componentId
  // if (component.emits && component.emits.length > 0) {
  //   // console.log("Creating emits methods");
  //   // console.log("emits", component.emits);
  //   // console.log("handles", component.handles);
  //   dataToBind.emit = createEmitMethods(component);
  // }

  const bindedFunction = newFunction.bind(dataToBind);

  // if (printThis) console.log("this", bindedFunction);

  return bindedFunction;
}

/**
 * @param {Object<string,Function>} methods
 * @returns {Object<string,Function>} The methods.
 */
function createMethods(methods, component) {
  const methodsObj = {};

  for (const name in methods) {
    methodsObj[name] = createMethod(methods[name], component);
  }

  return methodsObj;
}

export { createMethods, createMethod };
