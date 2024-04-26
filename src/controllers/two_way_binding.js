import { Global } from "../globals.js";
import "../types/Variable.js";
import { setVariable } from "./variable.js";

const bindingAttribute = "h-bind";

/**
 *
 * @param {HTMLElement} template
 * @param {Object<Variable>} all_variables
 * @returns
 */

function bindVariables(template, all_variables) {
  if (!template) return console.error("No template provided.");
  if (!all_variables) return console.error("No variables provided.");

  const nodesToBind = getNodesToBind(template);
  createBindings(nodesToBind, all_variables);

  return true;
}

/**
 *
 * @param {HTMLElement} template
 * @returns {NodeListOf<Element>}
 */
function getNodesToBind(template) {
  if (
    !template ||
    !template.querySelectorAll ||
    typeof !template.querySelectorAll == "function"
  ) {
    return [];
  }

  return template.querySelectorAll(`[${bindingAttribute}]`);
}

/**
 * It creates bindings for the provided nodes.
 * @param {NodeListOf<Element>} nodesToBind
 * @param {Object<Variable>} variables
 */
function createBindings(nodesToBind, variables) {
  for (const node of nodesToBind) {
    createBinding(node, variables);
  }
}

/**
 * It creates a binding for the provided node.
 * @param {Element} nodeToBind
 * @param {Object<Variable>} variables
 */

function createBinding(nodeToBind, variables) {
  const attributeValue = nodeToBind.getAttribute(bindingAttribute);
  const variable = variables[attributeValue];

  if (!variable)
    return console.error(
      `Variable ${attributeValue} not found while creating binding.`
    );

  const attributeToBind = getAttributeToBind(nodeToBind);

  console.warn(
    "im setting " +
      variable.name +
      " with value: " +
      variable.value +
      " to " +
      nodeToBind
  );
  nodeToBind.value = variable.value;

  // handle change from the input side
  //   nodeToBind.addEventListener("change", (e) => inputHandler(e, variable));
  nodeToBind.addEventListener("input", (e) => inputHandler(e, variable));

  // handle change from the variable side
  variable.inputNodes.push(nodeToBind);
}

function getAttributeToBind(nodeToBind) {
  const tagName = nodeToBind.tagName.toLowerCase();
  if (nodeToBind.type === "checkbox" || nodeToBind.type === "radio") {
    return "checked";
  }

  if (nodeToBind.type === "file") {
    return;
  }

  return "value";
}

function inputHandler(e, variable) {
  const attribute = getAttributeToBind(e.target);
  setVariable(variable, e.target[attribute]);
}

export { bindVariables, getAttributeToBind };
