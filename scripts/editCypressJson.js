const fs = require('fs');

var fileIndexPath = "cypress/support/index.js"

function editFileIndex() {
    var importRequire = '\n\nconst {WaitFunctions} = require("./WaitFunctions");\nimport "cypress-pipe"\nrequire("cypress-commands");'
    var variables = "\n\n/**\r\n * Variable with the contents from variables.json file\r\n * @type {JSON}\r\n */\r\nexport var fileJsonVariables;\r\n\r\n/**\r\n * Variable with the contents from dictionary.json file\r\n * @type {JSON}\r\n */\r\nexport var fileJsonDictionary;"
    var saveScreenshots = "\r\n\r\n/**\r\n * Function to save a screenshot after each failed test;\r\n * Essencial to build reports.\r\n */\r\nCypress.on('test:after:run', (test, runnable) => {\r\n    if (test.state === 'failed') {\r\n        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`\r\n        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)\r\n    }\r\n})"
    var checkXHR = "\n\n/**\r\n * Function to setup a cypress server before each test;\r\n * Server configured to count active XHR requests.\r\n */\r\nbeforeEach(() => {\r\n    WaitFunctions.checkXHRequests();    \r\n})"
    var readFiles = "\r\n\r\n/**\r\n * Function to read the necessary files before the tests start;\r\n * File variables.json => fileJsonVariables;\r\n * File dictionary.json => fileJsonDictionary.\r\n */\r\nbefore(() => {\r\n    cy.readFile(\"variables.json\").then(fileVariables => {\r\n        fileJsonVariables = fileVariables;\r\n    });\r\n    cy.readFile(\"dictionary.json\").then(fileDictionary => {\r\n        fileJsonDictionary = fileDictionary;\r\n    });\r\n})"
    fs.appendFileSync(fileIndexPath, importRequire + variables + saveScreenshots + checkXHR + readFiles, { 'flags': 'a' });
}

function setupFileIndex() {
    try {
        if (fs.existsSync(fileIndexPath)) {
            editFileIndex();
        } else {
            console.log("\nFile index.js does not exist, please run the command npx cypress open first!\n\n");
        }
    } catch (err) {
        console.error("\nError searching for file index.js\n\n")
    }
}

setupFileIndex()