import {
  createComponent,
  renderComponent,
  mountComponent,
} from "./controllers/component.js";

import component from "./components/secondComponent/Second.js";

// creates a component
function createMySecondComponent() {
  const emitter = {
    emit: "THIS WILLL BE EMITTED",
    name: "BEST EMITTER EVER",
  };

  const innerComponent = createComponent(component);
  renderComponent(innerComponent);

  const mountDiv = document.querySelector("#app");
  mountComponent(innerComponent, mountDiv);

  return innerComponent;
}

// creates 5 components and stores them in an array
const components = [];
for (let i = 0; i < 5; i++) {
  components.push(createMySecondComponent());
}

// console.log("are variables equal?");
// console.log(components[0].vars === components[1].vars);

// changes the name variable of the first component after 5 seconds
// setTimeout(() => {
//   console.log("Start changing");
//   setVariable(Global.variables["name-0"], "NEW NAME");
// }, 5000);

// function test(param1, param2, param3) {
//   console.log("Params of the TEST function:", param1, param2, param3);
//   console.log("THIS:", this);
// }

// const testFunc = test.bind({ name: "TEST" });
// testFunc("param1", "param2", "param3");
// test("param1", "param2", "param3");
