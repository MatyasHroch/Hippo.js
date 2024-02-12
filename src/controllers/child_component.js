// TYPES
import "../types/InnerComponent.js";
import "../types/UserComponent.js";

import {
  createComponent,
  renderComponent,
  mountComponent,
} from "./component.js";

import { createPropsToPass } from "./property.js";

// CONSTANTS
const componentAttribute = "component";

/**
 * It finds all children, that component has declered in the template and returns them in a children ctructure
 * @param {InnerComponent} component
 * @returns {Object<Node>} Object of children and their nodes
 */
function getChildrenNodes(component) {
  const renderedTemplate = component.renderedTemplate;

  // we get all nodes, that have the attribute 'component' and we get the value of the attribute
  const childNodes = renderedTemplate.querySelectorAll(
    `[${componentAttribute}]`
  );

  // no we create an object that would have name of the children as a key and the value would be the node
  const childrenNodes = {};
  for (const child of childNodes) {
    const name = child.getAttribute(componentAttribute);
    childrenNodes[name] = child;
  }

  // console.log({ childrenNodes });
  return childrenNodes;
}

/**
 * It finds all children and call create method with them
 * @param {InnerComponent} component
 * @param {Object<Node>} childrenNodes - Object of children nodes
 */
function createChildren(parentComponent) {
  const children = parentComponent.children;

  const createdChildren = {};
  // HERE I CREATE THE CHILDREN COMPONENTS and assign them to the childComponents
  for (const childName in children) {
    const childStructure = children[childName];
    const propsToPass = createPropsToPass(parentComponent, childStructure);

    const childComponent = childStructure.component;
    childComponent.parent = parentComponent;

    createdChildren[childName] = createComponent(childComponent, propsToPass);
  }

  return createdChildren;
}

/**
 * It finds all children and call render method with them
 * @param {InnerComponent} component
 * @param {Object<Node>} childrenNodes - Object of children nodes
 */
function renderChildren(component) {
  const children = component.children;

  const childComponents = Object.values(children);

  // HERE I RENDER THE CHILDREN
  for (const childComponent of childComponents) {
    renderComponent(childComponent);
  }

  return;
}

/**
 * It finds all children and call mount method with them
 * @param {InnerComponent} component
 */
function mountChildren(component, childrenNodes = null) {
  // TODO mount children
  if (!childrenNodes) childrenNodes = getChildrenNodes(component);

  const children = component.children;

  // HERE I MOUNT THE CHILDREN
  for (const childName in childrenNodes) {
    const childComponent = children[childName];
    const nodeToMount = childrenNodes[childName];

    mountComponent(childComponent, nodeToMount);
  }

  return;
}

export { getChildrenNodes, createChildren, renderChildren, mountChildren };
