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
  // BE CAREFULL, we dont have the computed properties available in the expressions
  // DONT USE THE COMPUTED INSIDE OF COMPUTED

  const valueObj = {};

  for (const name in boundExpressions) {
    valueObj[name] = boundExpressions[name]();
  }

  // TODO - Then we can create the variables as usual
  const variables = createVariables(component, valueObj, componentId);

  // TODO - And then, after all is done, we can assign expression, and dependencies

  for (const name in variables) {
    variables[name].expression = boundExpressions[name];

    variables[name].dependencies = getEcpressionDependencies(
      component,
      userExpressions[name]
    );

    for (const dependency of variables[name].dependencies) {
      addDependentVariable(dependency, variables[name]);
    }
  }

  // TODO - And were DONE

  for (const name in variables) {
    // console.log("Computed object before return:", name, variables[name].value);
  }

  return variables;
}

/**
 *
 * @param {Variable} variable
 */

function getEcpressionDependencies(component, expression) {
  const dependencies = [];

  const regex = /this.([a-zA-Z0-9]+)/g;

  let match = regex.exec(expression);

  const allVars = { ...component.vars, ...component.props };

  while (match != null) {
    const dependency = match[1];

    if (allVars[dependency]) {
      dependencies.push(allVars[dependency]);
    }

    match = regex.exec(expression);
  }

  return dependencies;
}

export { createComputedVariables };
