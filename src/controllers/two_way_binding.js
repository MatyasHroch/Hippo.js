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
  console.log({ nodesToBind });
  createBindings(nodesToBind, all_variables);

  return true;
}

/**
 *
 * @param {HTMLElement} template
 * @returns {NodeListOf<Element>}
 */
function getNodesToBind(template) {
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

  if (!variable) return console.error("Variable not found: creating binding.");

  nodeToBind.value = variable.value;

  // handle change from the input side
  //   nodeToBind.addEventListener("change", (e) => changeHandler(e, variable));
  nodeToBind.addEventListener("input", (e) => changeHandler(e, variable));

  // handle change from the variable side
  variable.inputNodes.push(nodeToBind);
}

function inputHandler(e, variable) {
  setVariable(variable, e.target.value);
}

function changeHandler(e, variable) {
  console.log({ variable });
  console.log(e.target.value);
  setVariable(variable, e.target.value);
}

export { bindVariables };
