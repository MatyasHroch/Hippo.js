/**
 * Returns an array of text nodes from a given node.
 * @param {HTMLElement} node
 * @returns {Array<HTMLElement>} Array of text nodes.
 */
function getTextNodes(node) {
  if (!node) console.error("No node provided.");

  const textNodes = [];

  if (node.childNodes.length > 0) {
    for (const childNode of node.childNodes) {
      textNodes.push(...getTextNodes(childNode));
    }
  } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
    textNodes.push(node);
    // console.log("node.nodeValue:", node.nodeValue);
  }

  return textNodes;
}

function printTextNodes(node) {
  if (!node) console.error("No node provided.");
  if (node.childNodes.length > 0) {
    node.childNodes.forEach((childNode) => {
      printTextNodes(childNode);
    });
  } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
    // console.log("node.nodeValue:", node.nodeValue);
  }
}

/**
 *
 * @param {HTMLElement} node
 * @param {Function} func
 * @returns
 */

function mapNodes(node, func) {
  if (!node) console.error("No node provided.");
  if (!func) console.error("No function provided.");
  console.log("func:");
  console.log(func);
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

export { getTextNodes, mapNodes };
