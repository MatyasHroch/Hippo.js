import "../types/Event.js";
import "../types/Emitter.js";

const emitter = {
  globalEvents: {},
  emitFunctions: {},
  queue: [],
};

// TODO - make it for not global events
/**
 * Registers the handler for the given event name
 * @param {string} name
 * @param {InnerComponent} component
 * @param {Function} hadler
 * @returns {void}
 */
function registerHandler(name, component, hadler) {
  if (!emitter.globalEvents[name]) {
    emitter.globalEvents[name] = createEvent(name);
  }

  const event = emitter.globalEvents[name];
  event.subscribers.push(component);
  event.handlers.push(hadler);
}

/**
 * Registers the handlers for the given component
 * @param {InnerComponent} component
 * @returns {void}
 */
function registerHandlers(component) {
  if (!component || !component.handlers) return;

  for (const name in component.handlers) {
    registerHandler(name, component, component.handlers[name]);
  }
}

/**
 * Creates an event structure with the given name
 * @param {string} name
 * @returns {Event} The event.
 */
function createEvent(name) {
  const event = {
    name,
    subscribers: [],
    emitters: [],
    handlers: [],
  };

  return event;
}

/** Emits the event with the given name and the given arguments
 * @param {string} name
 * @param  {...any} args
 */
function emitEvent(name, ...args) {
  if (!emitter.globalEvents[name]) {
    // console.log("Event has not existed");
    emitter.globalEvents[name] = createEvent(name);
  }

  console.log("NOW WE WOULD EMIT THE EVENT", name, args);

  const event = emitter.globalEvents[name];
  for (const handler of event.handlers) {
    // console.log("In the emit event");
    // console.log("handler", handler);
    // console.log("args", args);
    // here we call the component's handler
    handler(...args);
  }
}

// // creates the emit function for the given event name,
// // TODO - optimaze it
// function createEmitEvent(name, componentId) {
//   return function (...args) {
//     emitEvent(name, componentId, ...args);
//   };
// }

// for now just emit the event, sth like public version of emitEvent

/** Emits the event with the given name and the given arguments
 * @param {string} name
 * @param  {...any} args
 * @returns {void}
 */
function emit(name, ...args) {
  emitEvent(name, ...args);
}

export { registerHandlers, emitter, emit };

// TODO - make it accessible from the component's methods
// part of the solution:

// /** Creates the emit methods, so then it is possible to emit the event by addressing the method via .<emitName>
//  * @param {InnerComponent} component
//  * @returns {Object<string,Function>} The emit methods.
//  */
// function createEmitMethods(component) {
//   if (!component || !component.emits) return;

//   // if the emit methods are already created, return them
//   if (emitter.emitFunctions[component.id])
//     return emitter.emitFunctions[component.id];

//   // create the emit methods
//   const emitMethods = {};
//   for (const name of component.emits) {
//     emitMethods[name] = createEmitMethod(name, component);
//   }

//   // save it for another component to use
//   emitter.emitFunctions[component.id] = emitMethods;

//   // return the emit methods
//   return emitMethods;
// }

// // TODO - make it for not global events
// /** Assign this component and the event to the global events
//  * @param {string} name
//  * @returns {function}
//  */
// function createEmitMethod(name, component) {
//   if (!emitter.globalEvents[name]) {
//     emitter.globalEvents[name] = createEvent(name);
//   }

//   const event = emitter.globalEvents[name];
//   event.emitters.push(component);

//   // we return the emit function from the emitter
//   return createEmitEvent(name);
// }
