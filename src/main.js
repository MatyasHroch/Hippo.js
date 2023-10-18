import { Component } from "./types/Component.js";

import { createComponent } from "./creators/component.js";
import { createTemplate } from "./creators/template.js";
import { Global } from "./globals.js";

import component from "./components/secondComponent/component.js";

// import createCompoment from "./controllers/components/builder.js";
// import { renderComponent } from "./controllers/components/render.js";
// import component from "./components/firstComponent/firstComponent.js";
// import Global from "./universum.js";
// import set from "./controllers/components/variables.js";

function createMySecondComponent() {
  console.log(component);

  const interComponent1 = createCompoment(component);
  //   console.log("interComponent1:");
  //   console.log(interComponent1);

  //   const interComponent2 = createCompoment(component);
  //   console.log("interComponent2:");
  //   console.log(interComponent2);

  //   const renderedComponent1 = renderComponent(interComponent1);
  //   console.log("renderedComponent1:");
  //   console.log(renderedComponent1);

  console.log("Global.variables:");
  console.log(Global.variables);
}

createMySecondComponent();

// export default createMySecondComponent;
