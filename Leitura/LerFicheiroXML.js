const fs = require('fs');
var parseString = require('xml2js').parseString;

const InterfaceLerFicheiro = require("./InterfaceLerFicheiro");

class LerFicheiroXML extends InterfaceLerFicheiro {

    constructor() {
        super()
    }

    lerVariavel(path) {
        let rawdata = fs.readFileSync(path);
        var resultado;
        parseString(rawdata, function(err, result) {
            resultado = result.teste
        });
        return resultado;
    }
}

module.exports = LerFicheiroXML;