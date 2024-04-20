import "./types/UserComponent.js";
import "./types/InnerComponent.js";

import { processComponent } from "./controllers/component.js";
import { Global } from "./globals.js";
import Article from "./components/Article/Article.js";

// // creates components and stores them in an array
const components = [];

for (let i = 0; i < 1; i++) {
  components.push(processComponent(Article));
}

// console.log("");
// for (const varName in Global) {
//   if (Global[varName]) {
//   }
// }

// async function createArticles() {
//   for (let i = 0; i < 250; i++) {}
// }

// async function createArticles2() {
//   for (let i = 0; i < 500; i++) {
//     components.push(processComponent(Article));
//   }
// }

// createArticles();
// createArticles2();

// console.log("components created");

// setTimeout(() => {
//   console.log("Start changing");
//   emitter.emit("someEvent", -10, "Hello from main");
// }, 5000);
