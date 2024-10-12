import Module from './module.class'

export default class Modules {

    constructor() {
        this.data = [];
    }

    populate(datos) {
        this.data = datos.map(dato => new Module(dato.code, dato.cliteral, dato.vliteral, dato.courseId));
    }

    addModule(nuevoModulo) {
        
        nuevoModulo.courseId = (this.data.length > 0 ? Math.max(...this.data.map(modulo => modulo.code)) : 0) + 1;
        
        const newModulo = new Module(nuevoModulo.code, nuevoModulo.cliteral, nuevoModulo.vliteral, nuevoModulo.courseId);

        this.data.push(newModulo);

        return newModulo;
    }

    removeModulo(code) {

        if (!this.data.find(modulo => modulo.courseId === code)) {
            throw new Error("El módulo con código " + code + " no existe.");
        }

        this.data = this.data.filter(modulo => modulo.courseId !== code);
    }

    changeModule(modulo) {

        const newModulo = modulo instanceof Modulo ? modulo : new Module(modulo.code, modulo.cliteral, modulo.vliteral, modulo.courseId);
        const indiceModulo = this.data.findIndex(modulo => modulo.courseId == newModulo.courseId);
                
        if (indiceModulo === -1) {
            throw new Error("El módulo que deseas modificar no existe.");
        }

        this.data[indiceModulo] = newModulo;
        
        return newModulo;
    }

    toString() {
        return this.data.map(modulo => 
            `Id de módulo: ${modulo.courseId}. code: ${modulo.code}. cliteral: ${modulo.cliteral}. vliteral: ${modulo.vliteral}.`
        ).join('\n');
    }



    getModuleByCode(moduleCode) {

        const modulo = this.data.find(modulo => modulo.code === moduleCode);
        console.log(moduleCode.moduleCode);
        
        if (!modulo) throw new Error("El módulo con código " + moduleCode + " no existe.");
        
        return modulo;
    }
}