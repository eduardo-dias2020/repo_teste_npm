var readlineSync = require('readline-sync');
var fs = require('fs');

const projectConfigurationFilePath = "projectConfiguration.json"
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

exports.editMainIndexFile = (indexFilePath) => {
    var projectConfigurationFile = JSON.parse(fs.readFileSync(projectConfigurationFilePath));
    var fileTestVariablesPath = projectConfigurationFile.testVariablesFilePath
    var fileDictionaryPath = projectConfigurationFile.dictionaryFilePath
    var whiteList = setWhiteList();
    var importRequire = "\r\nimport 'cypress-pipe'\r\nrequire('cypress-commands');\r\n\r\nconst WaitFunctions = require(\"framework_glintt_tests_e2e/WaitFunctions\");\r\nconst ProcessFilesFunctions = require(\"framework_glintt_tests_e2e/ProcessFilesFunctions\");\r\nconst addContext = require('mochawesome/addContext')"
    var saveScreenshots = "\r\n\r\n/**\r\n * Function to save a screenshot after each failed test;\r\n * Essencial to build reports.\r\n */\r\nCypress.on('test:after:run', (test, runnable) => {\r\n    if (test.state === 'failed') {\r\n        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`\r\n        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)\r\n    }\r\n})"
    var checkXHR = "\n\n/**\r\n * Function to setup a cypress server before each test;\r\n * Server configured to count active XHR requests.\r\n */\r\nbeforeEach(() => {\r\n    WaitFunctions.checkXHRequests();    \r\n})"
    var readFiles = "\r\n\r\n/**\r\n * Function to read the necessary files before the tests start;\r\n */\r\nbefore(() => {\r\n    cy.readFile(\"" + fileTestVariablesPath + "\").then(fileVariables => {\r\n        var fileVariablesFormat = (\"" + fileTestVariablesPath + "\").split('.').pop().toUpperCase();\r\n        ProcessFilesFunctions.setfileVariables(fileVariables,fileVariablesFormat);\r\n    });\r\n    cy.readFile(\"" + fileDictionaryPath + "\").then(fileDictionary => {\r\n        var fileDictionaryFormat = (\"" + fileDictionaryPath + "\").split('.').pop().toUpperCase();\r\n        ProcessFilesFunctions.setFileDictionary(fileDictionary, fileDictionaryFormat);\r\n    });\r\n})"
    fs.appendFileSync(indexFilePath, importRequire + whiteList + saveScreenshots + checkXHR + readFiles, { 'flags': 'a' });
}

exports.editPluginsIndexFile = (pluginsIndexFilePath) => {
    var cypressInitialConfig = "/// <reference types=\"cypress\" />\r\n// ***********************************************************\r\n// This example plugins/index.js can be used to load plugins\r\n//\r\n// You can change the location of this file or turn off loading\r\n// the plugins file with the 'pluginsFile' configuration option.\r\n//\r\n// You can read more here:\r\n// https://on.cypress.io/plugins-guide\r\n// ***********************************************************\r\n\r\n// This function is called when a project is opened or re-opened (e.g. due to\r\n// the project's config changing)\r\n\r\n/**\r\n * @type {Cypress.PluginConfig}\r\n */\r\nmodule.exports = (on, config) => {\r\n  // `on` is used to hook into various events Cypress emits\r\n  // `config` is the resolved Cypress config\r\n}"
    var methods = "\r\n\r\nconst cucumber = require('cypress-cucumber-preprocessor').default\r\n \r\nmodule.exports = (on, config) => {\r\n  on('file:preprocessor', cucumber())\r\n}\r\n"
    fs.appendFileSync(pluginsIndexFilePath, cypressInitialConfig + methods, { 'flags': 'a' });
}