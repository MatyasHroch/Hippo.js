import "./Variable.js";

/**
 * @typedef {Object} InnerComponent
 * @property {number} id
 * @property {HTMLElement | string} template
 * @property {Object<string,Function>} methods
 * @property {Object<string,Variable>} vars
 * @property {Function} created
 * @property {Object<InnerComponent>} children
 */
