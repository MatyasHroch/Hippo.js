// TYPES
import "../types/InnerComponent.js";
import "../types/UserComponent.js";

import { createId } from "./id.js";
import { createVariables } from "./variable.js";
import { createTemplate } from "./template.js";
import { createMethods } from "./method.js";
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

  const component = {};

  component.id = createId();
  component.vars = createVariables(userComponent.vars, component.id);
  component.template = createTemplate(userComponent.templateString);
  component.templateString = userComponent.templateString;
  component.methods = createMethods(userComponent.methods, component);

  // console.log("created Components methods:");
  // console.log(component.methods);

  return component;
}

/**
 * Renders a component.
 * @param {InnerComponent} component - The component.
 * @param {object} node - The node to render the component in.
 * @returns {InnerComponent} The rendered component.
 **/
function renderComponent(component) {
  // console.log("component in renderComponent:");
  // console.log(component);
  if (!component) node = document.body;

  // TODO include properties to the rendering
  const { template, vars } = component;
  const renderedTemplate = renderTemplate(template, vars);
  component.renderedTemplate = renderedTemplate;
  // console.log("component in renderComponent:");
  // console.log(component);

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
