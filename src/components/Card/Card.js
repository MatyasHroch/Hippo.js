import Heading from "../Heading/Heading.js";

export default {
  vars: {
    message: "'Hello World is the default message'",
    name: "First",
    surname: "Component",
    file: null,
    isChecked: false,
    idecko: null,
    selectedItemIndex: null,
  },

  children: {
    heading2: {
      component: Heading,
      props: {
        text() {
          return this.heading.value + " HHAHAA";
        },
        size() {
          return 2;
        },
      },
    },

    heading1: {
      component: Heading,
      props: {
        text() {
          return this.heading.value.toUpperCase();
        },
        size() {
          return 2;
        },
      },
    },
  },

  created: function () {
    // const { id } = this;
    // console.log({ id });
    // console.log("THIS:", this);
    // this.changeMessage("NEW MESSAGE");
    // this.changeName();
    // console.log(this.emitSomeEvent);

    const select = document.getElementBy;

    this.idecko.set(this.id);
    this.emitSomeEvent("SOME EVENT");
  },

  methods: {
    changeMessage,
    changeName,
    emitSomeEvent: function (message) {
      // emitter.emit("someEvent", message);
      // console.log("emitSomeEvent's THIS:", this);
    },
  },

  props: {
    heading: "default",
    errorMess: "default",
    fullName: "default",
  },

  handlers: {
    someEvent: function (message) {
      // console.log(this);
      this.changeMessage(message);
    },
  },

  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),
};

function changeMessage(message) {
  // console.log(message);
  // console.log("message in changeMessage:", message);
  // console.log("changeMessage THIS:", this);
}

function changeName() {
  // console.log(this.name);
  // setTimeout(() => {
  //   this.name.set("NEW NAME!!!" + this.id);
  // }, 2000);

  console.log("changeName THIS:", this);
}

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
