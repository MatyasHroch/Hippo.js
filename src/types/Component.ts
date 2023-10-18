import { Variable } from "./Variable";



class Component{
    name: string;
    variables: Variable[];

    constructor(name: string, variables: Variable[]){
        this.name = name;
        this.variables = variables;
    }
}

export { Component };
