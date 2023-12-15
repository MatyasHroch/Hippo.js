import { Global } from "../globals.js";

function getFullName(name, componentId) {
  return `${name}-${componentId}`;
}

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

/**
 *
 * @param {*} variables
 * @param {*} componentId
 * @returns
 */
function createVariables(variables, componentId) {
  const variablesObj = {};
  for (const name in variables) {
    const variable = createVariable(name, variables[name], componentId);
    variablesObj[variable.name] = variable;
  }
  return variablesObj;
}

// TODO
function renderVariables(textNode, variables) {
  const foundVariables = findVariables(textNode);
  if (!foundVariables) return;

  foundVariables.forEach((foundVariable) => {
    const variableName = foundVariable.replace(/{{\s*|\s*}}/g, "");
    const variable = variables[variableName];
    if (!variable) return;

    variable.nodes.push(textNode);
  });
}

// TODO
function findVariables(node) {
  const foundVariables = node.textContent.match(/{{\s*[\w.]+\s*}}/g);
  return foundVariables;
}

export { createVariables };
