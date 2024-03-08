export default {
  templateString: await getTemplateString(),
  templatePath: getTemplatePath(),

  created() {
    setTimeout(() => {
      // this.text.set("HELLOOO WOOORLDDD");
    }, 1000);
  },

  props: {
    text: "default",
    size: 2,
  },

  computed: {
    randomHeading() {
      return this.text.value + " | " + Math.random() * 1000;
    },
  },

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
