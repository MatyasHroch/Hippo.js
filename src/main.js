import {
  createComponent,
  renderComponent,
  mountComponent,
} from "./controllers/component.js";
import { Global } from "./globals.js";
import component from "./components/secondComponent/Second.js";

const html = document.body;
// html.innerHTML = component.templateString;
// console.log(html);

// console.log(html);

// import createCompoment from "./controllers/components/builder.js";
// import { renderComponent } from "./controllers/components/render.js";
// import component from "./components/firstComponent/firstComponent.js";
// import Global from "./universum.js";
// import set from "./controllers/components/variables.js";

function createMySecondComponent() {
  // console.log("component before creation, so User Component:");
  // console.log(component);

  const innerComponent = createComponent(component);
  console.log(innerComponent.template);
  // console.log("component after creation, so innter Component:");
  // console.log({ innerComponent });
  //   console.log("innerComponent:");
  //   console.log(innerComponent);

  //   const innerComponent = createCompoment(component);
  //   console.log("innerComponent:");
  //   console.log(innerComponent);

  const renderedComponent = renderComponent(innerComponent);
  // console.log(renderedComponent.template);
  console.log(renderedComponent.renderedTemplate);
  mountComponent(renderedComponent, document.body);
  // console.log("renderedComponent:");
  // mountComponent(renderedComponent);
  // console.log("renderedComponent:");
  // console.log(renderedComponent);

  // console.log("Global.variables:");
  // console.log(Global.variables);
}

createMySecondComponent();

// export default createMySecondComponent;
