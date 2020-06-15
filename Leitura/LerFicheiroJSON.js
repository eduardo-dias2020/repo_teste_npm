const fs = require('fs');

const InterfaceLerFicheiro = require("./InterfaceLerFicheiro");

class LerFicheiroJSON extends InterfaceLerFicheiro {

    constructor() {
        super()
    }

    lerVariavel(path) {
        let rawdata = fs.readFileSync(path);
        let student = JSON.parse(rawdata);
        return student;
    }
}

module.exports = LerFicheiroJSON;