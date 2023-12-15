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

  // first we will clone it so we will not change the original template
  const clonedTemplate = template.cloneNode(true);
  const nodes = mapNodes(clonedTemplate);

  // now we will go through all variables and replace the variable names with the values

  // console.log({ renderedTemplate });
  // return renderedTemplate;
}

function mapNodes(node, func) {
  const nodes = [];
  nodes.push(node);
  func(node);

  if (node.hasChildNodes()) {
    node.childNodes.forEach((childNode) => {
      nodes.push(...mapNodes(childNode));
    });
  }
  return nodes;
}

function findVariables(node) {
  const foundVariables = node.textContent.match(/{{\s*[\w.]+\s*}}/g);
  return foundVariables;
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
