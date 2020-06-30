class ClasseTeste {

    static variavel;

    static setVar() {
        this.variavel = "Teste"
    }

    static imprimir() {
        console.log(this.variavel)
    }

}

module.exports = ClasseTeste;