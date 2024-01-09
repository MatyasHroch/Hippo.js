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

// FOR NOW WE NEED TO IMPORT THE EMITTER INSTANCE
import { emiterInstance as emitter } from "../../emitter/emitterInstance.js";

export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),
  created: function () {
    const { vars, id } = this;
    console.log(`component ${id} created`);

    // TRYING TO EMIT
    const myEmitter = emitter;
    console.log(myEmitter);

    setTimeout(() => {
      vars.message.set("ABSOLUTELY NEW MESSAGEE!!! " + id);
    }, 2000);
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
    changeMessage: function (param1, param2, param3) {
      const { vars } = this;
      if (this) console.log(this.vars.message);
      setTimeout(() => {
        vars.message.set("ABSOLUTELY NEW MESSAGEE!!!");
      }, 2000);
    },
  },
  // emits: ["message"],
  // recieves: {
  //   changeMessage: this.changeMessage,
  //   recieveMessage: function (message) {
  // },
};
