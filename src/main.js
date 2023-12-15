import { createComponent, renderComponent } from "./controllers/component.js";
import { Global } from "./globals.js";

import component from "./components/secondComponent/Second.js";

const html = (document.body.innerHTML = component.templateString);

function printTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    console.log("TEXT NODE:", node);
  }
  if (node.hasChildNodes()) {
    console.log("node.childNodes of node:");
    console.log(node.childNodes);
    console.log();

    node.childNodes.forEach((childNode) => {
      printTextNodes(childNode);
    });
  }
}

printTextNodes(document.body);

// console.log(html);

// import createCompoment from "./controllers/components/builder.js";
// import { renderComponent } from "./controllers/components/render.js";
// import component from "./components/firstComponent/firstComponent.js";
// import Global from "./universum.js";
// import set from "./controllers/components/variables.js";

function createMySecondComponent() {
  console.log("component before creation, so User Component:");
  console.log({ component });

  const interComponent = createComponent(component);
  console.log("component after creation, so innter Component:");
  console.log({ interComponent });
  //   console.log("interComponent:");
  //   console.log(interComponent);

  //   const interComponent = createCompoment(component);
  //   console.log("interComponent:");
  //   console.log(interComponent);

  const renderedComponent = renderComponent(interComponent);
  console.log("renderedComponent:");
  console.log(renderedComponent);

  console.log("Global.variables:");
  console.log(Global.variables);
}

// createMySecondComponent();

// export default createMySecondComponent;
