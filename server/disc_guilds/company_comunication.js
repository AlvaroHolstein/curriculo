/** Aqui só vai ficar as funções de comunicação com as empresas */
const Discord = require('discord.js'); 

class ChatMessage  {

    constructor() {
        /** Responder loo a certas perguntas
         * Será que até estas mensagens deviam ficar gravadas na base de dados 
         * para depois as conversa terem nexo, opu seja, 
         * saber que as empresa estão a falar com o bot
         */
    }

    automaticResponses(msg) {
        /** aqui devia estar uma lista de respostas rápidas e automaticas 
         * que não seja necessário o meu input
         * algo como umas FAQ's
         * e funcionaria com um prefixo seguido do que o utilizador quer saber
         * Ex:
         * !
         */
    }

    /** Isto também nõa é aqui por aqui */
    sendMessagesToFrontend(msg) {
        socket.emit("messageFromDiscord", msg);
    }

    /** Resolve and Reject come from the promise from the messages route
     * secalhar não ficam em primeiro mas sim em 2º e em 3º
     */
    createChannel(resolve, reject, usernameId, channelId = null) {
        /** Criar canal só no caso de o user ainda não o ter criado */

        //1. Ver canais
        //1.1 Se o channelId for null em principio vai ser para criar um canal para o user
        console.log(discCli);
        // discCli
    }

    // this.fetchMessagesByChannel = function fetchMessagesByChannel(ch, chId) {
    //     return new Promise((res, rej) => {
    //         ch.messages.fetch()
    //     })
    // }
}

exports.ChatMessage = ChatMessage;