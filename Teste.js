class Teste {
    static testeVar = "Bonito"

    static setTeste() {
        this.testeVar = "Top"
    }

    static print() {
        console.log(this.testeVar)
    }
}

module.exports = Teste;