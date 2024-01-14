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

import Card from "../Card/Card.js";

export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),

  created: function () {
    console.log("The Article has been created");
  },

  vars: {
    heading: "The best Article",
    viewMax: 10,
  },

  children: {
    Card,
  },

  methods: {},

  handlers: {},

  props: {},
};
