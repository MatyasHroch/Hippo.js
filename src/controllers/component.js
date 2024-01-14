// TYPES
import "../types/InnerComponent.js";
import "../types/UserComponent.js";

// CREATING COMPONENT
import { createId } from "./id.js";
import { createVariables } from "./variable.js";
import { createTemplate } from "./template.js";
import { createMethods, createMethod } from "./method.js";
import { registerHandlers } from "./emitter.js";
import { assignProperties } from "./propertie.js";

// RENDERING COMPONENT
import { renderTemplate } from "./template.js";

/**
 * Creates a component from a user component.
 * It is possible to provide a template, otherwise the template will be loaded from the component.
 * @param {UserComponent} userComponent - The user component.
 * @param {string | null} template - The template, that can be used instead of the template from the component.
 * @returns {InnerComponent} The InnerComponent.
 **/
function createComponent(userComponent, recursive = true, template = null) {
  if (!userComponent) return null;
  if (!template) userComponent.template = template;

  // TODO if there is no value in the slots, then dont call the method for creating the slots values

  const component = {};

  // some properties are just copied from the user component
  component.templateString = userComponent.templateString;
  component.handlers = userComponent.handlers;
  component.children = userComponent.children;

  // creating the id, variables and template for the inner component
  component.id = createId();
  component.vars = createVariables(userComponent.vars, component.id);
  component.template = createTemplate(userComponent.templateString);

  // creating the methods and assigning them to the component
  // after that we have acces to the component and its values via 'this'
  component.methods = createMethods(userComponent.methods, component);
  component.handlers = createMethods(userComponent.handlers, component);

  // registering the handlers so component can handle events
  registerHandlers(component);

  // assigning the created method to the component
  component.created = createMethod(userComponent.created, component);
  // and calling it
  component.created();

  if (recursive && userComponent.children) {
    console.log("In create Component recursive, arguments to createChildren:");
    console.log({ component });
    // calling methods to the children
    component.children = createChildren(component);
    console.log(
      "In create COMPONENT RECURSIVE, the component after createChildren:"
    );
    console.log({ component });
  }

  // component.props = assignProperties(component, userComponent.props);

  return component;
}

/**
 * Renders a component.
 * @param {InnerComponent} component - The component.
 * @param {object} node - The node to render the component in.
 * @returns {InnerComponent} The rendered component.
 **/
function renderComponent(component, recursive = true) {
  if (!component) console.error("No component provided");

  // TODO include properties to the rendering
  const { template, vars } = component;
  const renderedTemplate = renderTemplate(template, vars);
  component.renderedTemplate = renderedTemplate;

  if (recursive && component.children) {
    console.log("In remder Component recursive, arguments to renderChildren:");
    console.log({ component });
    renderChildren(component);
  }

  return component;
}

/**
 * Mounts a component to the DOM.
 * @param {InnerComponent} component - The component.
 * @param {HTMLElement} node - The node to render the component in.
 * @returns {InnerComponent} The rendered component.
 **/
function mountComponent(renderedComponent, node = null, recursive = true) {
  if (!node) node = document.body;
  node.appendChild(renderedComponent.renderedTemplate);

  if (recursive && renderedComponent.children) {
    console.log("In mount Component recursive, arguments to mountChildren:");
    console.log({ renderedComponent });
    mountChildren(renderedComponent);
  }

  return renderedComponent.renderedTemplate;
}

/**
 * It creates, render and mount the component.
 * @param {UserComponent} component
 * @returns {InnerComponent} The rendered component.
 */
function processComponent(component) {
  const innerComponent = createComponent(component);
  renderComponent(innerComponent);
  const mountDiv = document.querySelector("#app");
  mountComponent(innerComponent, mountDiv);
  return innerComponent;
}

// TODO get all children from the template and a slot
/**
 * It finds all children, that component has declered in the template and returns them in a children ctructure
 * @param {InnerComponent} component
 * @returns {Object<Node>} Object of children and their nodes
 */
function getChildrenNodes(component) {
  const renderedTemplate = component.renderedTemplate;

  console.log({ renderedTemplate });

  // we get all nodes, that have the attribute 'comp' and we get the value of the attribute
  const childNodes = renderedTemplate.querySelectorAll("[comp]");
  console.log({ childNodes });

  // no we create an object that would have name of the children as a key and the value would be the node
  const childrenNodes = {};
  for (const child of childNodes) {
    const name = child.getAttribute("comp");
    childrenNodes[name] = child;
  }

  console.log({ childrenNodes });
  return childrenNodes;
}

/**
 * It finds all children and call create method with them
 * @param {InnerComponent} component
 * @param {Object<Node>} childrenNodes - Object of children nodes
 */
function createChildren(component) {
  const children = component.children;

  const createdChildren = {};
  // HERE I CREATE THE CHILDREN COMPONENTS and assign them to the component
  for (const childName in children) {
    console.log("!!! In createChildren, arguments to createComponent:");
    console.log({ childName });

    const childComponent = children[childName];
    createdChildren[childName] = createComponent(childComponent);
    // TODO assign the created component to the component
    // TODO assign properties to the component
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
    console.log("!!! In renderChildren, arguments to renderComponent:");
    console.log({ childComponent });
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
  console.log("!!! In mountChildren, component");
  console.log({ component });

  const children = component.children;

  // HERE I MOUNT THE CHILDREN
  for (const childName in childrenNodes) {
    const childComponent = children[childName];
    const nodeToMount = childrenNodes[childName];

    console.log("!!! In mountChildren, arguments to mountComponent:");
    console.log({ childComponent });
    console.log({ nodeToMount });
    mountComponent(childComponent, nodeToMount);
  }

  return;
}

export { createComponent, renderComponent, mountComponent, processComponent };
