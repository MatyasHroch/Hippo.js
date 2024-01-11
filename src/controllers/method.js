/**
 * Adds the component slots to the method to access them via 'this'.
 * @param {Function} method
 * @param {InnerComponent} component
 * @returns {Function} The  method.
 */
function createMethod(method, component) {
  if (!method) console.error("Method is not defined.");
  if (!component) console.error("Component is not defined.");

  function newFunction(...arg) {
    method.call(this, ...arg);
  }

  const bindedFunction = newFunction.bind({
    ...component.vars,
    ...component.props,
    ...component.methods,
    ...component.id,
  });

  // TODO bind it without the names, just the functions
  // TODO IMPORTANT - bind the emits to the component, so that the component can emit
  if (component.emits) {
    newFunction.bind({
      emits: component.emits,
    });
  }

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
