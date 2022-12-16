/** Vai ser aqui que as mensagens vão ser recebidas primariamnete,
 * e enviadas....
 * 
 * É capaz de haver merda quando mandar isto para o heroku, por causa do port...
 * Mas por agora se funcionar em localhost tá bem lindo.
 */

// Vai ser preciso saber se está a correr em produção ou development
/**
 * This is a description (https://stackoverflow.com/questions/6815903/what-is-the-correct-way-of-code-comments-in-javascript)
 * @method socketInicialization
 * @param {server} some string
 * @return {bool} some bool
 */
const Discord = require("discord.js");
const jwt = require("jsonwebtoken");

// Este channelId já não vai ser preciso, e dai pode servir para ser o default channel ...
const messageController = require("./controller/message.controller");

class SocketInicialization {

    constructor(io) {
        this.io = io
        // console.log(io)

        // https://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io
        this.io.use((socket, next) => {
            // console.log("Socket middleware");
            next()
        })
    }

    /** Vou fazer aqui fora a função para guardar as mensagens que depois é usada em cima */
    async saveMessage(message, username, channelName, env) {
        try {
            /** Se a mensagem não for guardada copm sucesso vou ter que fazer algo que 
             * avise o user disso
             */

            await messageController.saveMessages(message, false, username, channelName, "", "", env);
        } catch (error) {
            /**
            * Não acho que isto eseja bem apanhado, sou capaz de ter que juntar 
            * ao error handleer que já fiz, um "próprio" do node e depois enviar a partir dai as cenas para o error handler do express
            */
            throw error;
        }
    }

    /** Mandar para aqui a funcção para ir buscar msg's ao discord e o nome do canal
     * 
     * @param {String} channelName
     */
    getMessagesByCh(channelName) {
        /**
         * 1. Já tenho aqui o client (this.client)
         * 1.1 Por isso o que vou ter que 
         *  ir bucar o canal a partir do nome que recebo nesta função,
         *  como os nomes dos canais vêm no token (username+idM) tenho como
         *  ir buscar o canal certo depois de um forEach
        */
        const filter = m => m ? true : false;
        return new Promise((res, rej) => {
            if (this.client) {

                this.client.guilds.cache.forEach((guild) => {
                    if (guild.name == "ServidorBot") {
                        guild.channels.cache.forEach((ch) => {
                            /** IMPORTANTE:
                             * 
                             * Os nomes dos canais são sempre em minusculas
                             */
                            if (ch.type == 'text' && ch.name == channelName) {

                                let txtCh = new Discord.TextChannel(guild, null)
                                let msgCh = new Discord.Message(this.client, null, txtCh);

                                msgCh.fetch().then(messages => {
                                    res(messages)
                                }).catch(err => {
                                    rej(err)
                                })
                            }
                        })
                    }
                })

            }
        })
    }

    // io.listen(port+1);// acho que isto afinal não vai ser preciso, update num é
}

module.exports = {
    SocketInit: SocketInicialization,
};