import Card from "../Card/Card.js";

export default {
  created: function () {
    setTimeout(() => {
      this.errorMess.set("NEW ERROR MESSAGE");
      this.heading.set("NEW HEADING");

      this.name.set = "herbert";
    }, 3000);

    console.log("Article created");
    console.log("Just the variable:", this.errorMess);
    console.log("The value:", this.errorMess.value);
  },

  computed: {
    fullName: function () {
      let name = this.name;

      if (typeof name == "string") {
        name = name.toUpper;
      }

      const fullName = `${this.name} | ${this.surname}`;
      return fullName;
    },
    smallName: function () {
      return this.name + this.surname;
    },
  },

  vars: {
    heading: "OLD HEADING",
    viewMax: 10,
    errorMess: "OLD ERROR MESSAGE",
    name: "Albert",
    surname: "Einstein",
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
