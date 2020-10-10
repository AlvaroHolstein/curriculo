/** Aqui só vai ficar as funções de comunicação com as empresas */

function ohthecoms(socket, discCli) {
    /** Responder loo a certas perguntas
     * Será que até estas mensagens deviam ficar gravadas na base de dados 
     * para depois as conversa terem nexo, opu seja, 
     * saber que as empresa estão a falar com o bot
     */
    function automaticResponses(msg) {
        /** aqui devia estar uma lista de respostas rápidas e automaticas 
         * que não seja necessário o meu input
         * algo como umas FAQ's
         * e funcionaria com um prefixo seguido do que o utilizador quer saber
         * Ex:
         * !
         */
    }

    /** Isto também nõa é aqui por aqui */
    function sendMessagesToFrontend(msg) {
        socket.emit("messageFromDiscord", msg);
    }
}

module.exports = ohthecoms;