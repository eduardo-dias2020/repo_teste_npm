const ContextLeitura = require("./ContextLeitura");

const LerFicheiroXML = require('./LerFicheiroXML');
const LerFicheiroJSON = require('./LerFicheiroJSON');

const classes = { LerFicheiroXML, LerFicheiroJSON };


class LeituraFactory {
    static CreateContext(path) {
        var context = null;

        var checkFileFormat = path.split('.').pop().toUpperCase();
        var className = "LerFicheiro" + checkFileFormat;
        const ClassFileReader = this.dynamicClass(className)

        try {
            context = new ContextLeitura(new ClassFileReader());
            return context;

        } catch (err) {
            throw new FileFormatException("File format" + checkFileFormat + "is not supported!");
        }
    }

    static dynamicClass(name) {
        return classes[name];
    }

}

module.exports = LeituraFactory;