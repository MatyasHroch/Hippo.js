// TYPES
import "../types/InnerComponent.js";
import "../types/UserComponent.js";

// UTILS
import { notEmpty } from "../utils/shortcuts.js";

// CREATING COMPONENT'S PARTS
import { createId } from "./id.js";
import { createVariables } from "./variable.js";
import { createTemplate } from "./template.js";
import { createMethods, createMethod } from "./method.js";
import { registerHandlers } from "./emitter.js";
import { createProperties } from "./property.js";
import { createComputedVariables } from "./computed.js";

// RENDERING COMPONENT
import { renderTemplate } from "./template.js";

// PROCESSING CHILD COMPONENTS
import {
  createChildren,
  renderChildren,
  mountChildren,
} from "./child_component.js";

/**
 * Creates a component from a user component.
 * It is possible to provide a template, otherwise the template will be loaded from the component.
 * @param {UserComponent} userComponent - The user component.
 * @param {object<Variable>|Array<Variable>} properties - The properties that will be assigned to the component.
 * @param {boolean} recursive - If the children should be created.
 * @param {string | null} template - The template, that can be used instead of the template from the component.
 * @returns {InnerComponent} The InnerComponent.
 **/
function createComponent(
  userComponent,
  properties,
  recursive = true,
  template = null
) {
  if (!userComponent) {
    console.error("User Component not provided");
    return null;
  }
  if (!template) {
    template = userComponent.template;
  }

  // TODO if there is no value in the slots, then dont call the method for creating the slots values
  const component = {};

  // some properties are just copied from the user component
  component.templateString = userComponent.templateString;
  component.handlers = userComponent.handlers;
  component.children = userComponent.children;
  component.parent = userComponent.parent;

  // creating the id, variables and template for the inner component
  component.id = createId();

  // creating the properties (assigning the values and variables to the component)
  if (userComponent.props && notEmpty(userComponent.props)) {
    component.props = createProperties(userComponent, properties);
  }

  // creating the reactive variables
  component.vars = createVariables(userComponent.vars, component.id);

  // creating the template
  component.template = createTemplate(userComponent.templateString);

  // creating the methods and assigning them to the component
  // after that we have acces to the component and its values via 'this'
  component.methods = createMethods(userComponent.methods, component);
  component.computed = createComputedVariables(
    userComponent.computed,
    component
  );

  component.handlers = createMethods(userComponent.handlers, component);

  // registering the handlers so component can handle events
  registerHandlers(component);

  // assigning the created method to the component
  component.created = createMethod(userComponent.created, component);
  // and calling it
  component.created();

  if (recursive && userComponent.children) {
    // TODO create multiple children
    // creates a child component

    component.children = createChildren(component);
    component.userChildren = userComponent.children;
  }

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
  const { template, vars, props } = component;

  const allVars = { ...vars, ...props };

  const renderedTemplate = renderTemplate(template, allVars);
  component.renderedTemplate = renderedTemplate;

  if (recursive && component.children) {
    // console.log("In remder Component recursive, arguments to renderChildren:");
    // console.log({ component });
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
    // console.log("In mount Component recursive, arguments to mountChildren:");
    // console.log({ renderedComponent });
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

export { createComponent, renderComponent, mountComponent, processComponent };
