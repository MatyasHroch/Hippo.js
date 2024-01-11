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

import { emit } from "../../controllers/emitter.js";

export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),

  created: function () {
    const { id } = this;
    console.log(`component ${id} created`);
    // console.log(this.emit.someEvent("Hello from created"));
    console.log("someEvent emitted from created component: " + this.id);
    // emit("someEvent", id, "Hello from created emitted");

    // this.changeMessage();
  },

  vars: {
    message: "Hello World",
    name: "First",
    surname: "Component",
  },

  props: {
    errorMess: null,
    alertMess: null,
  },

  methods: {
    changeMessage,
    changeName,
    emitSomeEvent: function (message) {
      console.log("emitSomeEvent accepted in the component:" + this.id);
      console.log({ message });
      // console.log(this.emitSomeEvent("hello"));
      // this.emit.someEvent(message);
    },
  },

  // emits: ["someEvent"],

  handlers: {
    someEvent: function (fromId, message) {
      console.log("message received from " + fromId);
      console.log({ message });
      console.log("My 'this' is:");
      // console.log(this);
      this.changeMessage(message);
    },
  },
};

function changeMessage(message) {
  console.log(message);
  this.message.set(message + " " + this.id);
}

function changeName() {
  console.log(this.name);

  setTimeout(() => {
    this.name.set("NEW NAME!!!" + this.id);
  }, 2000);
}

function emitSomeEvent() {}
