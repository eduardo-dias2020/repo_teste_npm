class WaitFunctions {

    /**
     * Attribute with the number of active xhr (XMLHttpRequest)
     * @type {int}
     */
    static xhrCounter = 0;


    /**
     * Function to start the cypress server and define the actions to take when a xhr is sent, aborted or closed
     */
    static checkXHRequests() {
        console.log("Este é o contador " + xhrCounter);
    }

}

module.exports = WaitFunctions;