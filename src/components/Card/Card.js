import { emitter } from "../../controllers/emitter.js";

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

  props: {
    errorMess: null,
    alertMess: null,
    heading: null,
    background: "bg-red",
  },

  methods: {
    changeMessage,
    changeName,
    emitSomeEvent: function (message) {
      emitter.emit("someEvent", message);
      console.log("emitSomeEvent's THIS:", this);
    },
  },

  // not necessary
  // emits: ["someEvent"],

  handlers: {
    someEvent: function (message) {
      this.changeMessage(message);
    },
  },
};

function changeMessage(message) {
  // console.log(message);
  console.log("message in changeMessage:", message);
  console.log("changeMessage THIS:", this);
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
