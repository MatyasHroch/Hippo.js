// TYPES
import "../types/InnerComponent.js";

import { createMethods } from "./method.js";
import { createVariables } from "./variable.js";

/**
 *
 * @param {Object<Variable>} variables
 * @param {InnerComponent} component
 */
function createComputedVariables(variables, component) {
  const computedObj = {};

  // TODO - We create a methods from the computed functions
  for (const varName in variables) {
    const computedExpression = variables[varName];
    // console.log({ varName });
    // console.log(computedExpression);
  }

  // TODO - Then we evaluate those methods and set it as the values of new Variables

  // TODO - Then we can create the variables as usual

  // TODO - And then, after all is done, we can assign expression, and dependencies

  // TODO - And were DONE

  //   for (const name in variables) {
  //     console.log({ name });
  //   }

  return computedObj;
}

// function getComputedValue(variable) {}

function createComputedVariable(variable, component) {}

/**
 *
 * @param {Variable} variable
 */

function createVariableDependencies(variable) {}

export { createComputedVariables };
