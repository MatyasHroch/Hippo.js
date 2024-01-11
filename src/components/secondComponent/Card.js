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

  created: function () {
    const { id } = this;
    console.log(`component ${id} created`);
    console.log(this.emit.someEvent("Hello from created"));

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
      if (message != "Hello from main") {
        console.log("this", this);
        console.log("message is not correct");
        return;
      }
      console.log("this", this);
      console.log({ message });
      console.log(this.emitSomeEvent("hello"));
      // this.emit.someEvent(message);
    },
  },

  emits: ["someEvent"],

  handles: {
    message: function (fromId, message) {
      console.log("message received from " + fromId);
      console.log(message);
      this.changeMessage();
    },
  },
};

function changeMessage() {
  console.log(this.message);

  setTimeout(() => {
    this.message.set("NEW MESSAGEE!!!" + this.id);
  }, 2000);
}

function changeName() {
  console.log(this.name);

  setTimeout(() => {
    this.name.set("NEW NAME!!!" + this.id);
  }, 2000);
}

function emitSomeEvent() {}
