import { emit } from "../../controllers/emitter.js";

export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),

  created: function () {
    const { id } = this;
    console.log({ id });
  },

  vars: {
    message: "Hello World",
    name: "First",
    surname: "Component",
  },

  props: {
    errorMess: null,
    alertMess: null,
    background: "bg-red",
  },

  methods: {
    changeMessage,
    changeName,
    emitSomeEvent: function (message) {
      emit("someEvent", message);
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
  this.message.set(message + " " + this.id);
}

function changeName() {
  // console.log(this.name);

  setTimeout(() => {
    this.name.set("NEW NAME!!!" + this.id);
  }, 2000);
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
