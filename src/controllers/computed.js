// TYPES
import "../types/InnerComponent.js";

import { createMethods } from "./method.js";
import { createVariables, addDependentVariable } from "./variable.js";

/**
 *
 * @param {Object<Function>} userExpressions
 * @param {InnerComponent} component
 */
function createComputedVariables(
  component,
  userExpressions,
  dataToBind = null,
  componentId = null
) {
  if (!componentId) {
    componentId = component.id;
  }

  // TODO - We create a methods from the computed functions
  const boundExpressions = createMethods(
    component,
    userExpressions,
    dataToBind
  );

  // TODO - Then we evaluate those methods and set it as the values of new Variables
  // BE CAREFULL, we dont have the computed properties available in the expressions !!!
  // DONT USE THE COMPUTED INSIDE OF COMPUTED !!!

  const valueObj = {};

  for (const name in boundExpressions) {
    valueObj[name] = boundExpressions[name]();
  }

  // TODO - Then we can create the variables as usual
  const variables = createVariables(component, valueObj, componentId);

  // TODO - And then, after all is done, we can assign expression, and dependencies

  for (const name in variables) {
    variables[name].expression = boundExpressions[name];

    console.log();

    variables[name].dependencies = getExpressionDependencies(
      component,
      userExpressions[name]
    );

    for (const dependency of variables[name].dependencies) {
      addDependentVariable(dependency, variables[name]);
    }
  }

  for (const name in variables) {
    console.log(
      "Computed object before return:",
      name,
      variables[name].expression
    );
    console.log(
      "and evaluated expression now is:",
      variables[name].expression()
    );
  }

  return variables;
}

/**
 *
 * @param {Variable} variable
 */

function getExpressionDependencies(component, expression) {
  const dependencies = [];

  const regex = /this.([a-zA-Z0-9]+)/g;

  let match = regex.exec(expression);

  const allVars = { ...component.vars, ...component.props };

  while (match != null) {
    const dependency = match[1];

    // if it is a primitive value
    if (allVars[dependency]) {
      dependencies.push(allVars[dependency]);
    }

    console.log("Dependency:", dependency);
    // if it is an object value (nested)
    const nestedVarKeys = dependency.split(".");
    if (nestedVarKeys && nestedVarKeys.length && nestedVarKeys.length > 1) {
      const nestedVar = allVars[nestedVarKeys[0]];
      dependencies.push(currentVar);
    }

    match = regex.exec(expression);
  }

  return dependencies;
}

export { createComputedVariables };
