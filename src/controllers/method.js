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
    vars: component.vars,
    props: component.props,
    methods: component.methods,
    id: component.id,
  });

  // console.log("bindedFunction called:");
  // bindedFunction("param1", "param2", "param3");

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
