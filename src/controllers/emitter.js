import "../types/Event.js";
import "../types/Emitter.js";

const emitter = {
  globalEvents: {},
};

// TODO - make it for not global events
/** Assign this component and the event to the global events
 * @param {string} name
 * @returns {function}
 */
function createEmitMethod(name, component) {
  if (!emitter.globalEvents[name]) {
    createEvent(name);
  }

  const event = emitter.globalEvents[name];
  event.emitters.push(component);

  return function () {};
}

// TODO - make it for not global events
// TODO - Do it so that the component can recieve the event (and call the method that is assign to it)
function createSubscriptionMethod(name, component) {
  if (!emitter.globalEvents[name]) {
    createEvent(name);
  }

  const event = emitter.globalEvents[name];
  event.subscribers.push(component);

  return function () {};
}

function createEvent(name) {
  const event = {
    name,
    subscribers: [],
    emitters: [],
    emit: function () {
      this.subscribers.forEach((subscriber) => {
        subscriber.recieveEvent(this.name);
      });
    },
  };

  return event;
}

export { createEmitMethod, createSubscriptionMethod, emitter };
