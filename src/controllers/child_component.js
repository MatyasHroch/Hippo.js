// TYPES
import "../types/InnerComponent.js";
import "../types/UserComponent.js";
import "../types/UserChildComponent.js";

import {
  createComponent,
  renderComponent,
  mountComponent,
  createId,
} from "./component.js";

import { createPropsToPass } from "./property.js";

// CONSTANTS
const componentAttribute = "component";

/**
 *
 * @param {Object<UserChildComponent>} children
 * @param {HTMLElement} renderedTemplate
 * @returns
 */

function getComponentTags(children, renderedTemplate) {
  // find all nodes that have a name of the children

  const resultChildrenNodes = {};

  for (const childName in children) {
    const childNode = renderedTemplate.querySelector(childName);
    if (!childNode) {
      console.error(`There is no node with name ${childName}`);
      continue;
    }

    resultChildrenNodes[childName] = childNode;
  }

  return resultChildrenNodes;
}

/**
 * It finds all children and call create method with them
 * @param {InnerComponent} component
 * @param {Object<Node>} childrenNodes - Object of children nodes
 */
function createChildren(parentComponent, dataToBind = null) {
  const children = parentComponent.children;

  const createdChildren = {};
  // HERE I CREATE THE CHILDREN COMPONENTS and assign them to the childComponents
  for (const childName in children) {
    const childStructure = children[childName];

    const childId = createId();

    const propsToPass = createPropsToPass(
      parentComponent,
      childStructure,
      dataToBind,
      childId
    );

    // HERE IT IS ABSOLUTELY OK
    // if (propsToPass && propsToPass.text) {
    //   console.log("propsToPass.text", propsToPass.text);
    // }

    const childComponent = childStructure.component;
    childComponent.parent = parentComponent;

    // TODO - IF THE CHILD HAS PROPERTIES

    createdChildren[childName] = createComponent(
      childComponent,
      propsToPass,
      true,
      null,
      childId
    );
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
  const children = component.children;

  if (!childrenNodes)
    childrenNodes = getComponentTags(children, component.renderedTemplate);

  // HERE I MOUNT THE CHILDREN
  for (const childName in childrenNodes) {
    const childComponent = children[childName];

    const specialComponentTag = childrenNodes[childName];
    const parent = specialComponentTag.parentNode;
    const repleacement = document.createElement("div");
    repleacement.setAttribute("contains-component", true);

    parent.replaceChild(repleacement, specialComponentTag);
    mountComponent(childComponent, repleacement);

    // mountComponent(childComponent, specialComponentTag);
  }

  return;
}

export { getComponentTags, createChildren, renderChildren, mountChildren };
