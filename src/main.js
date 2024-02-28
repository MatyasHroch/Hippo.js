import "./types/UserComponent.js";
import "./types/InnerComponent.js";

import { processComponent } from "./controllers/component.js";

import Article from "./components/Article/Article.js";

// // creates components and stores them in an array
const components = [];

components.push(processComponent(Article));

async function createArticles() {
  for (let i = 0; i < 250; i++) {}
}

async function createArticles2() {
  for (let i = 0; i < 500; i++) {
    components.push(processComponent(Article));
  }
}

// createArticles();
// createArticles2();

// console.log("components created");

// setTimeout(() => {
//   console.log("Start changing");
//   emitter.emit("someEvent", -10, "Hello from main");
// }, 5000);
