function setChild(parent, child) {
  parent.children.push = child;
  child.parent = parent;
}

const Global = {
  parent: null,
  variables: {},
  children: [],
};

const State = {
  parent: null,
  variables: {},
  children: [],
};

setChild(Global, State);

export { Global, State };
