export default class Module {

    constructor(code, cliteral, vliteral, courseId) {
        this.code = code;
        this.cliteral = cliteral;
        this.vliteral = vliteral;
        this.courseId = courseId;
    }

    toString() {
        return `Módulo: ${this.code} - ${this.cliteral} - ${this.vliteral} - ${this.courseId}`;
    }
}