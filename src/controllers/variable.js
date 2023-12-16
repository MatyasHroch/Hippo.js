import { Global } from "../globals.js";
import "../types/Variable.js";

/**
 * Composes the full name of the variable from its name and component id.
 * @param {string} name
 * @param {number} componentId
 * @returns {string} The full name of the variable.
 */
function getFullName(name, componentId) {
  return `${name}-${componentId}`;
}

/**
 * Creates a variable from its name, value and number.
 * Also registers the variable in the Global.variables object.
 * @param {string} name
 * @param {any} value
 * @param {number} componentId
 * @returns
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

  variable.set = (value) => setVariable(variable, value);
  Global.variables[fullName] = variable;

  return variable;
}

/**
 * Creates variables from the user variables object.
 * @param {Array<Object>} variables
 * @param {number} componentId
 * @returns {Array<Variable>} The variables.
 */
function createVariables(variables, componentId) {
  const variablesObj = {};

  for (const name in variables) {
    const variable = createVariable(name, variables[name], componentId);
    variablesObj[variable.name] = variable;
  }

  return variablesObj;
}

/**
 * It will recognize if the node is a variable or not.
 * If it is a variable, it will render it. (it returns created text element)
 * It also sets the node to the variable, so we will know where to update the value when it changes.
 * @param {string} nodeText
 * @param {Array<Variable>} variables
 */
function renderVariable(nodeText, variables) {
  if (!nodeText) console.log("No nodeText provided.");
  if (!variables) console.log("No variables provided.");

  if (nodeText.startsWith("{{") && nodeText.endsWith("}}")) {
    const variableName = nodeText.slice(2, -2).trim();
    const variable = variables[variableName];
    if (!variable) console.error("Variable not found.");

    const value = variable.value;
    const element = document.createTextNode(value);
    variable.nodes.push(element);
    return element;
  }

  return document.createTextNode(nodeText);
}

/**
 * Sets the value of the variable and updates the nodes.
 * @param {Variable} variable
 * @param {any} value
 */
function setVariable(variable, value) {
  variable.value = value;
  variable.updated = true;
  variable.updating = true;
  for (const node of variable.nodes) {
    node.textContent = value;
  }
  variable.updating = false;
}

/**
 * Finds variables in the text node if there are any
 * @param {HTMLElement} node
 * @returns {RegExpMatchArray | null} Text nodes or null.
 */
function findVariables(node) {
  const foundVariables = node.textContent.match(/{{\s*[\w.]+\s*}}/g);
  return foundVariables;
}

export { createVariables, renderVariable, findVariables, setVariable };
