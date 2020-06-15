const InterfaceLerFicheiro = require("./InterfaceLerFicheiro");

class ContextLeitura {

    constructor(strategy) {
        this.strategy = strategy;
    }

    lerVariavel(path) {
        return this.strategy.lerVariavel(path);
    }
}

module.exports = ContextLeitura;