import { Component } from "../types/Component";
import { UserComponent } from "../types/UserComponent";
import { createId } from "./id";
import { createVariables } from "./variable";
import { createTemplate } from "./template";

/**
 * @param {UserComponent} userComponent
 * @returns {Component}
 */

createComponent = function (userComponent, template = null) {
  if (!userComponent) return null;
  if (!template) userComponent.template = template;

  const component = {
    id: createId(),
    data: createVariables(userComponent.data, component.id),
    template: createTemplate(userComponent.template),
    // methods: createMethods(userComponent.methods),
  };

  return component;
};
