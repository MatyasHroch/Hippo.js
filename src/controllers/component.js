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
 * @param {object<Variable>|Array<Variable>} fromParentProperties - The properties that will be assigned to the component.
 * @param {boolean} recursive - If the children should be created.
 * @param {string | null} template - The template, that can be used instead of the template from the component.
 * @returns {InnerComponent} The InnerComponent.
 **/
function createComponent(
  userComponent,
  fromParentProperties,
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
  const objectToBind = {};

  // some properties are just copied from the user component
  component.templateString = userComponent.templateString;
  component.handlers = userComponent.handlers;
  component.children = userComponent.children;
  component.parent = userComponent.parent;

  // creating the id, variables and template for the inner component
  const id = createId();
  component.id = id;
  objectToBind.id = id;

  // creating the properties (assigning the values and variables to the component and the object to bind)
  if (component.props && notEmpty(component.props)) {
    const props = createProperties(userComponent, fromParentProperties);
    component.props = props;
    Object.assign(objectToBind, { ...props });
  }

  // creating the reactive variables
  if (userComponent.vars && notEmpty(userComponent.vars)) {
    const vars = createVariables(component, userComponent.vars);
    component.vars = vars;
    Object.assign(objectToBind, { ...vars });
  }

  // creating the template
  component.template = createTemplate(userComponent.templateString);

  // TODO - OBJECT TO BIND create the object to bind the this here, co every other entities can access it later

  // creating the methods and assigning them to the component
  // after that we have acces to the component and its values via 'this'

  if (userComponent.methods && notEmpty(userComponent.methods)) {
    const methods = createMethods(
      component,
      userComponent.methods,
      objectToBind
    );
    component.methods = methods;
    Object.assign(objectToBind, { ...methods });
  }

  if (userComponent.computed && notEmpty(userComponent.computed)) {
    const computed = createComputedVariables(
      component,
      component.computed,
      objectToBind
    );
    component.computed = computed;
    Object.assign(objectToBind, { ...computed });
  }

  if (userComponent.handlers && notEmpty(userComponent.handlers)) {
    console.log("The bind object efore handlers created:");
    console.log({ objectToBind });
    const handlers = createMethods(
      component,
      userComponent.handlers,
      objectToBind
    );
    component.handlers = handlers;

    // handlers will not be accessed through the 'this' context
    // Object.assign(objectToBind, { ...handlers });

    // registering the handlers so component can handle events
    registerHandlers(component, handlers);
  }

  // assigning the created method to the component
  component.created = createMethod(userComponent.created, objectToBind);

  // console.log("Now everything is done, aand we should call the created");
  // console.log({ objectToBind });
  // console.log({ component });

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
