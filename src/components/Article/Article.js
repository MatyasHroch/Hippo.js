import Card from "../Card/Card.js";

export default {
  created: function () {
    setTimeout(() => {
      this.errorMess.set("NEW ERROR MESSAGE");
      this.heading.set("NEW HEADING");
    }, 3000);
  },

  vars: {
    heading: "OLD HEADING",
    viewMax: 10,
    errorMess: "OLD ERROR MESSAGE",
  },

  // TODO set number of children
  // TODO load all the possible components -> maybe in the main.js

  children: {
    card: {
      component: Card,
      props: {
        errorMess: "errorMess",
        heading: "heading",
      },
    },
  },

  methods: {},

  handlers: {},

  props: {},

  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),
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
