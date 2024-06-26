import {
  getTextNodes,
  getNodesWithBoundAttributes,
} from "../utils/dom_utils.js";

import {
  renderVariable,
  findVariables,
  variableNameFromCurlyBraces,
  bindToAttribute,
} from "./variable.js";

/**
 * Transforms string to html structure.
 * Later we will optimize this function.
 * @param {string} templateString
 * @returns {HTMLElement} The template.
 */
function createTemplate(templateString) {
  const template = document.createElement("div");
  template.innerHTML = templateString;
  return template.firstChild;
}

/**
 * Replace variable names in the template with the values from the variables object.
 * It also register nodes in each variable, so we will know where to update the value when it changes.
 * @param {HTMLElement} template
 * @param {object} variables
 * @returns {HTMLElement} The rendered template.
 */
function renderTemplate(template, variables) {
  if (!template) return console.error("No template provided.");
  if (!variables) return console.error("No variables provided.");

  const clonedTemplate = template.cloneNode(true); // first we will clone it so we will not change the original template
  const textNodes = getTextNodes(clonedTemplate);

  renderTextNodes(textNodes, variables);

  // TODO render all classes that uses variables or properties (vars or props)
  renderAttributes(clonedTemplate, variables);

  // const classNodes = getClassNodes(clonedTemplate);
  // renderClasses(classNodes, variables)

  return clonedTemplate;
}

/**
 * Render attributes in the template that uses variables.
 * @param {HTMLElement} template
 * @param {object<Variable>} variables
 * It has a side effect and changes the given template.
 */
// TODO - DEBUG AND TEST THIS !!!
function renderAttributes(template, variables) {
  const nodesWithAttributes = getNodesWithBoundAttributes(template);

  for (const nodeStructure of nodesWithAttributes) {
    const attributes = nodeStructure.attributes;
    if (!attributes) return;

    for (const attribute of attributes) {
      const variableName = variableNameFromCurlyBraces(attribute.value);
      const variable = variables[variableName];
      if (variable) {
        bindToAttribute(variable, nodeStructure.node, attribute);
      }
    }
  }
}

/**
 * Render text nodes by splitting them into parts and composing them together.
 * @param {Array<HTMLElement>} textNodes
 */
function renderTextNodes(textNodes, variables) {
  for (const node of textNodes) {
    const foundVariables = findVariables(node);

    if (foundVariables) {
      const nodeText = node.nodeValue;
      const splittedText = splitNodeText(nodeText);
      const parent = node.parentNode;
      parent.removeChild(node);

      composeTextNodes(splittedText, variables, parent);
    }
  }
}

/**
 * Compose text nodes from the splitted text and variables.
 * Also calls renderVariable for each variable.
 * And appends the text node to the parent.
 * @param {Array<string>} splittedText
 * @param {Array<Variable>} variables
 * @param {HTMLElement} parent
 * @returns {HTMLElement} The parent.
 */
function composeTextNodes(splittedText, variables, parent) {
  for (const text of splittedText) {
    const textNode = renderVariable(text, variables);
    parent.appendChild(textNode);
  }
  return parent;
}

/**
 * Splits the node text into parts so we set apart the variables.
 * @param {string} nodeText
 * @returns {Array<string>} The splitted text.
 */
function splitNodeText(nodeText) {
  // Define the pattern for matching text and placeholders
  const pattern = /({{[^{}]*}})/;

  // Split the text using the pattern
  const textParts = nodeText.split(pattern);

  const filteredTextParts = textParts.filter((textPart) => textPart !== "");

  return filteredTextParts;
}

export { createTemplate, renderTemplate };

// Function to load a file as a string
// function loadFileAsString(filePath) {
// try {
//   const response = fetch(filePath);
//   const fileContent = response.text(); // Response as text
//   return fileContent;
// } catch (error) {
//   console.error("Error loading file:", error);
//   throw error;
// }
// }

// async function createTemplate(templatePath) {
//   await loadFileAsString(templatePath);
//   return templatePath;
// }

// // MAYBE LATER NEEDED go by layers through the template and register all nodes
// const allNodes = [];
// const nodesToInspect = [clonedTemplate];
// while (nodesToInspect.length > 0) {
//   const node = nodesToInspect.shift();
//   allNodes.push(node);

//   if (node.hasChildNodes()) {
//     nodesToInspect.push(...node.childNodes);
//   }
// }

// console.log("ALL NODES IN THE RIGHT ORDER:");
// console.log(allNodes);
