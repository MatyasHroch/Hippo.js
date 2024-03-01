import Heading from "../Heading/Heading.js";

export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),

  created: function () {
    // const { id } = this;
    // console.log({ id });
    // console.log("THIS:", this);
    // this.changeMessage("NEW MESSAGE");
    // this.changeName();
    // console.log(this.emitSomeEvent);
    this.emitSomeEvent("SOME EVENT");
  },

  vars: {
    message: "'Hello World is the default message'",
    name: "First",
    surname: "Component",
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

  children: {
    heading: {
      component: Heading,
      props: {
        text() {
          return this.heading.value;
        },
        size() {
          return 2;
        },
      },
    },
  },

  handlers: {
    someEvent: function (message) {
      // console.log(this);
      this.changeMessage(message);
    },
  },
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
