import "../types/Event.js";
import "../types/Emitter.js";

const emitter = {
  globalEvents: {},
  emitFunctions: {},
};

/** Creates the emit methods, so then it is possible to emit the event by addressing the method via .<emitName>
 * @param {InnerComponent} component
 * @returns {Object<string,Function>} The emit methods.
 */
function createEmitMethods(component) {
  if (!component || !component.emits) return;

  // if the emit methods are already created, return them
  if (emitter.emitFunctions[component.id])
    return emitter.emitFunctions[component.id];

  // create the emit methods
  const emitMethods = {};
  for (const name of component.emits) {
    emitMethods[name] = createEmitMethod(name, component);
  }

  // save it for another component to use
  emitter.emitFunctions[component.id] = emitMethods;

  // return the emit methods
  return emitMethods;
}

// TODO - make it for not global events
/** Assign this component and the event to the global events
 * @param {string} name
 * @returns {function}
 */
function createEmitMethod(name, component) {
  if (!emitter.globalEvents[name]) {
    emitter.globalEvents[name] = createEvent(name);
  }

  const event = emitter.globalEvents[name];
  event.emitters.push(component);

  // we return the emit function from the emitter
  return createEmitEvent(name);
}

// TODO - make it for not global events
function createHandleMethod(name, component) {
  if (!emitter.globalEvents[name]) {
    emitter.globalEvents[name] = createEvent(name);
  }

  const event = emitter.globalEvents[name];
  event.subscribers.push(component);

  return;
}

function createEvent(name) {
  const event = {
    name,
    subscribers: [],
    emitters: [],
  };

  return event;
}

/** Emits the event with the given name and the given arguments
 * @param {string} name
 * @param  {...any} args
 */
function emitEvent(name, fromId, ...args) {
  if (!emitter.globalEvents[name]) {
    console.log("Event does not exist");
    return;
  }

  console.log("NOW WE WOULD EMIT THE EVENT", name, args);

  const event = emitter.globalEvents[name];
  for (const subscriber of event.subscribers) {
    const theMethod = subscriber.handles[name];
    theMethod.call(fromId, ...args);
  }
}

// creates the emit function for the given event name,
// TODO - optimaze it
function createEmitEvent(name, componentId) {
  return function (...args) {
    emitEvent(name, componentId, ...args);
  };
}

function emit(name, fromId, ...args) {
  emitEvent(name, fromId, ...args);
}

export { createEmitMethods, createHandleMethod, emitter, emit };
