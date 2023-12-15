import { Global } from "../globals.js";

/**
 *
 * @returns {number} The next id in the sequence.
 */
function createId() {
  //   console.log("Global in createId:", Global);
  if (!Global.variables.nextId) {
    Global.variables.nextId = 0;
  }
  return Global.variables.nextId++;
}

export { createId };
