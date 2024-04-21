function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

function notEmpty(obj) {
  return Object.keys(obj).length > 0;
}

export { isEmpty, notEmpty, isObject };
