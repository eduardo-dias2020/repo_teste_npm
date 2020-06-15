const LeituraFactory = require("./LeituraFactory");


class LeituraService {

    static lerFicheiro(filePath) {
        var context = LeituraFactory.CreateContext(filePath);
        return context.lerVariavel(filePath)
    }

}

module.exports = LeituraService;