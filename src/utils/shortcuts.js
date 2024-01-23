function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function notEmpty(obj) {
  return Object.keys(obj).length > 0;
}

export { isEmpty, notEmpty };
