export default class Modules {

    constructor() {
        this.data = [];
    }

    




    getModuleByCode(moduleCode) {

        const modulo = this.data.find(modulo => modulo.moduleCode === moduleCode);
    
        if (!modulo) throw new Error("El módulo con código " + moduleCode + " no existe.");
        
        return modulo;
    }
}