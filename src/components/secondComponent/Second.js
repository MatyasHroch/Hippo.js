function getTemplatePath() {
  const currentScriptPath1 = new URL(import.meta.url).pathname;

  const currentScriptDirectory = currentScriptPath1.substring(
    0,
    currentScriptPath1.lastIndexOf("/")
  );

  return currentScriptDirectory + "/Second.html";
}

const templateString = `<article class="border-s rounder-s p-2 fit-content">
<div>
  <span>{{ message }}</span>
</div>
<button>Press Me To change the message</button>
<div>Surame: {{ surname }}</div>
<div>
  Name:
  <span>the {{ name }}</span>
</div>
<section>Neco neco <span>Neco2 neco2</span> Neco3 neco3</section>
</article>                    `;

export default {
  templateString: templateString,
  templatePath: getTemplatePath(),
  vars: {
    message: "Hello World",
    name: "First",
    surname: "Component",
  },
  // method: {
  //   changeMessage: () => {
  //     console.log("changeMessage");

  //   },
  // },
};
