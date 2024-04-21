import { Global } from "../globals.js";
import { getAttributeToBind as getBoundAttribute } from "./two_way_binding.js";
import { isObject } from "../utils/shortcuts.js";

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
  // if (fullName.includes("eading")) console.log(fullName);

  const variable = {
    name,
    fullName,
    value,
    componentId,
    updated: false,
    deleted: false,
    hidden: false,
    textNodes: [],
    attributeSetters: [],
    inputNodes: [],
    // {node: Node, expression: Function}
    textNodesWithExpression: [],
  };

  // setting the public method 'set' for setting the variable value
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
function createVariables(component, variables, componentId = null) {
  if (!componentId) {
    componentId = component.id;
  }

  const variablesObj = {};

  for (const name in variables) {
    const variable = createVariable(name, variables[name], componentId);
    variablesObj[variable.name] = variable;
  }

  return variablesObj;
}

function variableNameFromCurlyBraces(text) {
  return text.slice(2, -2).trim();
}

/**
 * It will recognize if the node is a variable or not.
 * If it is a variable, it will render it. (it returns created text element)
 * It also sets the node to the variable, so we will know where to update the value when it changes.
 * @param {string} nodeText
 * @param {Array<Variable>} variables
 */
function renderVariable(nodeText, variables) {
  if (!nodeText) console.error("No nodeText provided.");
  if (!variables) console.error("No variables provided.");

  if (nodeText.startsWith("{{") && nodeText.endsWith("}}")) {
    const variableName = variableNameFromCurlyBraces(nodeText);
    const variable = variables[variableName];

    if (!variable) {
      const varAndKeys = variableName.split(".");
      if (varAndKeys.length >= 1) {
        const composedVariable = variables[varAndKeys[0]];
        let keys = varAndKeys.slice(1);
        const expression = () => {
          return getValueByKeyPath(composedVariable, keys);
        };
        const value = expression();
        if (value !== undefined && value !== null) {
          const element = document.createTextNode(value);
          composedVariable.textNodesWithExpression.push({
            node: element,
            expression: expression,
          });

          return element;
        }
      }

      console.error(`Variable ${variableName} not found.`);
      return document.createTextNode("");
    }

    const value = variable.value;
    const element = document.createTextNode(value);
    variable.textNodes.push(element);

    return element;
  }

  return document.createTextNode(nodeText);
}

/**
 * From array of keys it safely returns value from object variable
 * @param {Variable} variable
 * @param {Array<string>} keys
 * @returns {any | undefined}
 */
function getValueByKeyPath(variable, keys) {
  const variablePart = variable.value[keys[0]];
  for (const i = 1; i < keys.length; i++) {
    // if the key does not exist on the object variable, we can handle that
    const key = keys[i];
    if (variablePart === undefined) {
      return undefined;
    }
    // to the next iteration we go deeper to the object
    variablePart = variablePart[key];
  }
  return variablePart;
}

/**
 * Re-renders variables values in the DOM
 * @param {Variable} variable
 * @param {any} value
 */
function reRenderVariable(variable, value) {
  if (variable === null) {
    console.log(variable);
    console.error("Variable not provided.");
  }

  if (value === null || value === undefined) {
    console.log(value);
    console.warn();
    ("Value is not printed because of its nothingness");
    value = "";
  }

  for (const node of variable.textNodes) {
    // changing just the text content
    node.textContent = value;
  }

  if (variable.textNodesWithExpression.length > 0) {
    for (const { node, expression } of variable.textNodesWithExpression) {
      // if the value is "" , we know, that there is no reason to evaluate the expression
      if (value === "") {
        node.textContent = value;
      } else {
        // changing just the text content with the expression value
        const newValue = expression();
        node.textContent = newValue;
      }
    }
  }

  // changing the value of the input and other elements with value attribute
  for (const boundNode of variable.inputNodes) {
    const attribute = getBoundAttribute(boundNode);
    if (attribute) boundNode[attribute] = value;
  }

  for (const setter of variable.attributeSetters) {
    setter(value);
  }
}

function bindToAttribute(variable, node, attribute) {
  const setter = (value) => {
    node.setAttribute(attribute.name, value);
  };
  setter(variable.value);

  variable.attributeSetters.push(setter);
}

/**
 * It will triger all the computed and watch-based variables
 * @param {Variable} variable
 * @returns
 */
function trigerDependentVariables(variable) {
  const dependentVariables = variable.dependentVariables;
  if (!dependentVariables) return;
  for (const dependentVariable of dependentVariables) {
    if (dependentVariable.updating) {
      console.error("Cyclic dependency detected.");
      return;
    }

    // TODO - better nested
    setVariable(dependentVariable, dependentVariable.expression());
  }
}

function addDependentVariable(variable, dependentVariable) {
  if (!variable.dependentVariables) {
    variable.dependentVariables = new Set();
  }

  variable.dependentVariables.add(dependentVariable);
}

/**
 * It will do everything what needs to be done when the variable is updated
 * @param {Variable} variable
 */
function handleVariableChange(variable) {
  trigerDependentVariables(variable);
  reRenderVariable(variable, variable.value);
}

/**
 * Sets the value of the variable and updates the nodes.
 * @param {Variable} variable
 * @param {any} value
 */
function setVariable(variable, value) {
  // we dont update the variable if the value is the same, that can solve the cyclic dependency in some cases
  if (!isObject(value) && variable.value === value) return;

  variable.updating = true;
  variable.value = value;

  // if (variable.name == "text")
  // console.log(variable.value, variable.fullName);

  handleVariableChange(variable);

  variable.updating = false;
  variable.updated = true;
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

export {
  createVariables,
  createVariable,
  addDependentVariable,
  renderVariable,
  findVariables,
  setVariable,
  variableNameFromCurlyBraces,
  bindToAttribute,
};
