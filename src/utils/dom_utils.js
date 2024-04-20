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

/**
 * Finds and returns all nodes with attributes, that are bound (has curly braces in the value).
 * @param {HTMLElement} node
 * @returns {Array<{node: HTMLElement, attributes: Array<Attr>}>}
 */
function getNodesWithBoundAttributes(node) {
  if (!node) console.error("No node provided.");
  const nodes = [];

  const boundAttributes = getBoundAttributes(node);
  if (boundAttributes.length > 0) {
    nodes.push({ node: node, attributes: boundAttributes });
  }

  if (node.childNodes.length > 0) {
    for (const childNode of node.childNodes) {
      nodes.push(...getNodesWithBoundAttributes(childNode));
    }
  }

  return nodes;
}

/**
 * Returns an array of attributes that are bound (has curly braces in the value).
 * @param {HTMLElement} node
 * @returns {Array<Attr>} Array of attributes that are bound (has curly braces in the value).
 */

function getBoundAttributes(node) {
  if (!node) console.error("No node provided.");

  const boundAttributes = [];
  const attributes = node.attributes;
  if (!attributes) return boundAttributes;

  for (const attribute of attributes) {
    if (attribute.value.startsWith("{{") && attribute.value.endsWith("}}")) {
      boundAttributes.push(attribute);
    }
  }

  return boundAttributes;
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

export { getTextNodes, mapNodes, getNodesWithBoundAttributes };
