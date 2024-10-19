import { getDBModules } from '../services/modules.api';
import Module from './module.class'

export default class Modules {

    constructor() {
        this.data = [];
    }

    async populate() {
        this.data = await getDBModules();
        this.data = this.data.map(modulo => new Module(modulo.code, modulo.cliteral, modulo.vliteral, modulo.courseId));
    }


    addModule(nuevoModulo) {
        try {
            const newModulo = new Module(nuevoModulo);
            
            addDBModule(newModulo);
 
            this.data.push(newModulo);    
            return newModulo;
        } catch (error) {
            console.log(error);
        }
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
            `Id de módulo: ${modulo.courseId} | Code: ${modulo.code} | Cliteral: ${modulo.cliteral} | Vliteral: ${modulo.vliteral}.`
        ).join('\n');
    }



    getModuleByCode(moduleCode) {

        const modulo = this.data.find(modulo => modulo.code === moduleCode);
        console.log(moduleCode.moduleCode);
        
        if (!modulo) throw new Error("El módulo con código " + moduleCode + " no existe.");
        
        return modulo;
    }
}