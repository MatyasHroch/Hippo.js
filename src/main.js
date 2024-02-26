import "./types/UserComponent.js";
import "./types/InnerComponent.js";

import { processComponent } from "./controllers/component.js";

import Card from "./components/Card/Card.js";
import Article from "./components/Article/Article.js";

import { emitter } from "./controllers/emitter.js";

// // creates components and stores them in an array
const components = [];
for (let i = 0; i < 2; i++) {
  // components.push(processComponent(Card));
  components.push(processComponent(Article));
}

// console.log("components created");

// setTimeout(() => {
//   console.log("Start changing");
//   emitter.emit("someEvent", -10, "Hello from main");
// }, 5000);
