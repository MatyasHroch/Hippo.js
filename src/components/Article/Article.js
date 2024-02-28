import Card from "../Card/Card.js";

export default {
  created() {
    setTimeout(() => {
      this.errorMess.set("NEW ERROR MESSAGE");
      this.heading.set("NEW HEADING");
      this.surname.set("NEW SURNAME");
      console.log("full var 'name'", this.name);
    }, 3000);
  },

  computed: {
    fullName() {
      const fullName = `${this.name.value} | ${this.surname.value}`;
      return fullName;
    },
    smallName() {
      return this.name.value + this.surname.value;
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
        heading() {
          return this.heading.value;
        },
        errorMess() {
          return this.errorMess.value;
        },
        fullName() {
          return this.fullName.value;
        },
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
