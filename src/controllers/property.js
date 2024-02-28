import "../types/InnerComponent.js";
import "../types/Variable.js";

import { createComputedVariables } from "./computed.js";

/**
 * @param {InnerComponent} childComponent
 * @param {InnerComponent} parentComponent
 * @param {Object<Variable>} properties
 * @returns {Object<Variable>}
 */
// TODO rebuild the assignProperties function and all the other functions that are using it !!!!!!!!!!!!!!!!
function createProperties(childComponent, fromParentProperties) {
  return fromParentProperties;
}

/**
 * It finds all variables that should be pass as a prop to the child component
 * @param {InnerComponent} component
 * @param {Child} childStructure
 */
function createPropsToPass(component, childStructure, dataToBind, childId) {
  const propsToPass = createComputedVariables(
    component,
    childStructure.props,
    dataToBind,
    childId
  );

  // const userPropsToPass = childStructure.props;
  // const parentVars = component.vars;

  // for (const propName in userPropsToPass) {
  //   // it should be a name of variable we want to pass
  //   const propValue = userPropsToPass[propName];
  //   // console.log({ propValue });

  //   // check if it is a string and if it is a variable, if it is not, then just continue
  //   // later we can do something like create the varable and pass it to the child
  //   if (typeof propValue !== "string" || !parentVars[propValue]) {
  //     // TODO create variable so it can be passed to the child!
  //     // propsToPass[propName] = propValue;
  //     continue;
  //   }

  //   // just assign the value of the variable to the prop
  //   propsToPass[propName] = parentVars[propValue];
  // }

  return propsToPass;
}

export { createProperties, createPropsToPass };
