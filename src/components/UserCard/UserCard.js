export default {
  vars: {
    user: {
      address: {
        street: "Bartolomejska",
        city: "Ostrava",
        postcode: "12345",
      },
    },
    heading: "BEST ARTICLE IN THE WORLD",
    seconds: 5,
  },
  computed: {
    fullAddress() {
      console.log("fullAddress computed and the THIS IS: ", this);

      const user = this.user.value;
      console.log("user:", user);

      const address = user.address;
      console.log("address:", this.user.value.address);

      return `${address.street}, ${address.city}, ${address.postcode}`;
    },
  },
  rendered() {
    setTimeout(() => {
      // setting primitive variable
      this.heading.set("BEST ARTICLE IN NEW YORK");

      // setting easily nested variable
      const user = this.user.value;
      user.address = {
        street: "Šemberova",
        city: "Olomouc",
        postcode: "54321",
      };

      this.user.set();
    }, 5 * 1000);

    setInterval(() => {
      this.seconds.set(this.seconds.value - 1);
      if (this.seconds.value <= 0) {
        this.seconds.set("");
        return;
      }
    }, 1 * 1000);
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
