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
function createComponent(userComponent, template = null) {
  if (!userComponent) return null;
  if (!template) userComponent.template = template;

  // TODO if there is no value in the slots, then dont call the method for creating the slots values

  const component = {};

  component.id = createId();
  component.vars = createVariables(userComponent.vars, component.id);
  component.template = createTemplate(userComponent.templateString);
  component.templateString = userComponent.templateString;

  // just copy the emits and handlers from the user component
  // component.emits = userComponent.emits;
  component.handlers = userComponent.handlers;

  // creating the methods and assigning them to the component
  // after that we have acces to the component and its values via 'this'
  component.methods = createMethods(userComponent.methods, component);
  component.handlers = createMethods(userComponent.handlers, component);

  // TODO subscribe to the emits
  registerHandlers(component);

  // assigning the created method to the component and calling it
  component.created = createMethod(userComponent.created, component);
  component.created();

  // component.props = assignProperties(component, userComponent.props);

  return component;
}

/**
 * Renders a component.
 * @param {InnerComponent} component - The component.
 * @param {object} node - The node to render the component in.
 * @returns {InnerComponent} The rendered component.
 **/
function renderComponent(component) {
  if (!component) node = document.body;

  // TODO include properties to the rendering
  const { template, vars } = component;
  const renderedTemplate = renderTemplate(template, vars);
  component.renderedTemplate = renderedTemplate;

  return component;
}

/**
 * Mounts a component to the DOM.
 * @param {InnerComponent} component - The component.
 * @param {HTMLElement} node - The node to render the component in.
 * @returns {InnerComponent} The rendered component.
 **/
function mountComponent(renderedComponent, node) {
  if (!node) node = document.body;
  node.appendChild(renderedComponent.renderedTemplate);
  return renderedComponent.renderedTemplate;
}

export { createComponent, renderComponent, mountComponent };
