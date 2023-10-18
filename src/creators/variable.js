import { Global } from "../globals";
import { Variable } from "../types/Variable";

function getFullName(name, componentId) {
  return `${name}-${componentId}`;
}

/**
 * @param {string} name
 * @param {Object} value
 * @param {number} componentId
 * @returns {Variable}
 */
function createVariable(name, value, componentId) {
  const fullName = getFullName(name, componentId);
  const variable = {
    name,
    fullName,
    value,
    componentId,
    updated: false,
    deleted: false,
    hidden: false,
    nodes: [],
  };
  Global.variables[fullName] = variable;
  return variable;
}

/***
 * @param {Object} variables
 * @param {number} componentId
 * @returns {Object<Variable>}
 */
function createVariables(variables, componentId) {
  const variablesArray = {};
  for (const name in variables) {
    const variable = createVariable(name, variables[name], componentId);
    variablesArray[variable.fullName] = variable;
  }
  return variablesArray;
}

export { createVariables };
