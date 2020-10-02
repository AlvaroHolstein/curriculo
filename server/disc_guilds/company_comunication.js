/** Aqui só vai ficar as funções de comunicação com as empresas */

function ohthecoms(socket, discCli) {
    /** Responder loo a certas perguntas
     * Será que até estas mensagens deviam ficar gravadas na base de dados 
     * para depois as conversa terem nexo, opu seja, 
     * saber que as empresa estão a falar com o bot
     */
    function automaticResponses(msg) {
        /** o message reply é para mandar as mensagen para o discord, 
         * não é bme isto que eu quero
         */
        // msg.reply()
    }

    /** Isto também nõa é aqui por aqui */
    function sendMessagesToFrontend(msg) {
        socket.emit("messageFromDiscord", msg);
    }
}

module.exports = ohthecoms;