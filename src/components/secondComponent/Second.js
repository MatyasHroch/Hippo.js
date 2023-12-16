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

export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),
  vars: {
    message: "Hello World",
    name: "First",
    surname: "Component",
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
};
