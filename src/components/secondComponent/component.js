const template = (
  <article class="border-s rounder-s p-2 fit-content">
    <div>
      <span> {{ message }} </span>
    </div>
    <button>Press Me To change the message</button>
    <div>
      Surame:
      <span>{{ surname }}</span>
    </div>
    <div>
      Name:
      <span>the {{ name }}</span>
    </div>
  </article>
);

const component = {
  template: template,
  data: {
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

export default { component, template };
