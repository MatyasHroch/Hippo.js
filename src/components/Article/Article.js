import Card from "../Card/Card.js";

export default {
  // created is called after the component is created
  rendered() {
    // setTimeout(() => {
    //   this.errorMess.set("NEW ERROR MESSAGE");
    //   // this.heading.set("NEW HEADING");
    //   this.surname.set("NEW SURNAME");
    //   // console.log("full var 'name'", this.name);
    // }, 3000);

    setTimeout(() => {
      this.heading.set("NEW HEADING");
      console.log("IM CHANGING THE VARIABLES !!!");
      const user = this.user.value;
      user.firstName = "My";
      user.lastName = "Druhy";

      const address = user.address;
      address.street = "Kostelni";
      address.city = "Ostrava 154645";

      this.user.set(user);
    }, 2 * 1000);
  },

  // inside of the Computed you cannot use any computed properties
  computed: {
    fullName() {
      const fullName = `${this.name.value} | ${this.surname.value}`;
      return fullName;
    },
    smallName() {
      return this.name.value + this.surname.value;
    },
    surnameClass() {
      if (this.showSurname.value) {
        return "display: inherit;";
      }
      return "display: none;";
    },
  },

  // new reactive variables
  vars: {
    heading: "OLD HEADING",
    viewMax: 10,
    errorMess: "OLD ERROR MESSAGE",
    name: "Albert",
    surname: "Einstein",
    disabled: false,
    margin: "m-2",
    showSurname: true,
    user: {
      firstName: "Ja",
      lastName: "Prvni",
      address: {
        street: "Bartolomejska",
        city: "Ostrava",
        zip: "12345",
      },
    },
  },

  // TODO set number of children
  // TODO load all the possible components -> maybe in the main.js

  children: {
    card: {
      component: Card,

      props: {
        heading() {
          const heading = this.heading.value;
          return heading.toLowerCase() + "- BUT THIS IS PROPERTIE";
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

  mutableProps: {},

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
