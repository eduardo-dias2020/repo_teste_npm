var readlineSync = require('readline-sync');
var fs = require('fs');

var platforms = ['ATD'];

function setWhiteList() {
    var index = readlineSync.keyInSelect(platforms, '\n\nWhich platform are you testing? ');

    var codeInString = "";
    switch (platforms[index]) {
        case "ATD":
            codeInString = "\n\n/**\r\n * Function to set a list of cookies that should not be deleted after each test\r\n */\r\nCypress.Cookies.defaults({\r\n    whitelist: ['ASP.NET_SessionId', 'GCCI.17R1_GLINTTOCM.ATENDIMENTO_WEB', 'GC17R101P.DEMOAPL17R101.ATENDIMENTO_WEB']\r\n})"
            break;
        default:
    }

    return codeInString;
}

const editMainIndexFile = (indexFilePath) => {
    var whiteList = setWhiteList();
    var importRequire = "\r\nimport 'cypress-pipe'\r\nrequire('cypress-commands');\r\n\r\nconst WaitFunctions = require(\"framework_glintt_tests_e2e/WaitFunctions\");\r\nconst ProcessFilesFunctions = require(\"framework_glintt_tests_e2e/ProcessFilesFunctions\");\r\nconst addContext = require('mochawesome/addContext')"
    var saveScreenshots = "\r\n\r\n/**\r\n * Function to save a screenshot after each failed test;\r\n * Essencial to build reports.\r\n */\r\nCypress.on('test:after:run', (test, runnable) => {\r\n    if (test.state === 'failed') {\r\n        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`\r\n        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)\r\n    }\r\n})"
    var checkXHR = "\n\n/**\r\n * Function to setup a cypress server before each test;\r\n * Server configured to count active XHR requests.\r\n */\r\nbeforeEach(() => {\r\n    WaitFunctions.checkXHRequests();    \r\n})"
    var readFiles = "/**\r\n * Function to read the necessary files before the tests start;\r\n */\r\nbefore(() => {\r\n    cy.readFile(\"variables.json\").then(fileVariables => {\r\n        ProcessFilesFunctions.setFileJsonVariables(fileVariables);\r\n    });\r\n    cy.readFile(\"dictionary.json\").then(fileDictionary => {\r\n        ProcessFilesFunctions.setFileDictionary(fileDictionary);\r\n    });\r\n})/**\r\n * Function to read the necessary files before the tests start;\r\n */\r\nbefore(() => {\r\n    cy.readFile(\"variables.json\").then(fileVariables => {\r\n        ProcessFilesFunctions.setFileJsonVariables(fileVariables);\r\n    });\r\n    cy.readFile(\"dictionary.json\").then(fileDictionary => {\r\n        ProcessFilesFunctions.setFileDictionary(fileDictionary);\r\n    });\r\n})"
    fs.appendFileSync(indexFilePath, importRequire + whiteList + saveScreenshots + checkXHR + readFiles, { 'flags': 'a' });
}

const editPluginsIndexFile = (pluginsIndexFilePath) => {
    var methods = "\r\n\r\nconst cucumber = require('cypress-cucumber-preprocessor').default\r\n \r\nmodule.exports = (on, config) => {\r\n  on('file:preprocessor', cucumber())\r\n}\r\n"
    fs.appendFileSync(pluginsIndexFilePath, methods, { 'flags': 'a' });
}

module.exports = editMainIndexFile;
module.exports = editPluginsIndexFile;