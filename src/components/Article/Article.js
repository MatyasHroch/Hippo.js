import Card from "../Card/Card.js";
import { emit } from "../../controllers/emitter.js";

export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),

  created: function () {
    setTimeout(() => {
      const { heading } = this;
      console.log({ heading });
      heading.set("NEW HEADING");
    }, 2000);
  },

  vars: {
    heading: "THE BEEST",
    viewMax: 10,
  },

  // TODO set number of children
  // TODO load all the possible components -> maybe in the main.js
  // we could search for the components, always add them into some structure and then always look for them there
  // and when we find them we could add them to the component, when we don't find them we could look for them in the components folder...
  // if we do that, we can also add the components to the structure when we create it, so we don't have to look for them again
  // the structure would look like { "Card": Card, "Article": Article, ...}
  // all this will give us the best option for creating child components -> it would look like this: { Card : { props: {}, count... and so on}}
  // children: {
  //   Card,
  // },

  children: {
    card: {
      component: Card,
      props: {
        errorMess: "heading",
      },
    },
  },

  methods: {},

  handlers: {},

  props: {},
};

function getTemplatePath() {
  const currentScriptPath = new URL(import.meta.url).pathname;
  const scriptFileName = currentScriptPath.split(".").shift();
  const templatePath = scriptFileName + ".html";
  return templatePath;
}

async function getTemplateString() {
  const response = await fetch(getTemplatePath());
  const templateString = await response.text();
  return templateString;
}
