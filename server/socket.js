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
let { discInit, defaultChanelId } = require("./disc.js");
const messageController = require("./controller/message.controller");

class socketInicialization {

    constructor(io) {
        this.io = io

        this.io.on("connection", socket => {
            /** Tá aqui a Inicialização do Discord Client para aqui, 
             * Acho que deve ser sermpre esta "variável" que deve ser usada na aplicação
             */
            this.client = discInit(socket);

            /** Vou ter que criar um role para atribuir aos canais criados penso eui de que mas aqu bai */
            let role = null;

            /** Perceber se este connect é só para os clientes, mas acho que sinhe */
            /**
             * Aqui os utilizadores só são conectados depois de passarem da página auth
             */
            console.log("Entrou Mais um", socket.id);
            socket.on("mess", async ({ text, token }) => {
                try {
                    let chanelExists = false;
                    let chanelId = null;
                    // console.log("Receive Message On Socket file !!!!!")
                    /**
                     * Vai ser aqui que vou receber as mensagens dos utilizadores,
                     * por isso é aqui que antes de enviar uma mensagem para um certo canal,
                     * tenho que verificar se o canal já existe ou não,
                     * e agir consoante isso
                     */

                    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
                    let { username, idM } = decoded;
                    let chanelName = username + idM;

                    /** Este forEach e o acima acabam por fazer um bocado a mesma coisa,
                     * mas o que eu quero é sós gerir o "ServidorBot"
                     * Se o fizer aqui o "gerenciamento" vai acontecer de toda a vez que o user mandar uma mensagem,
                     * mas se o fizer na função acima (.on("connection")) só acontece a primeira vez
                     * que um user connectar 
                     * 
                     * Por agora vou usar esta forma para fazer as cenas, a outra vai estar guardada no readme.md
                     */
                    let mainGuild = null;
                    this.client.guilds.cache.forEach((guild) => {
                        if (guild.name == "ServidorBot") {
                            mainGuild = guild;
                            guild.channels.cache.forEach((ch) => {
                                /** IMPORTANTE:
                                 * 
                                 * Os nomes dos canais são sempre em minusculas
                                 */
                                if (ch.type == 'text' && ch.name == chanelName.toLowerCase()) {
                                    chanelId = ch.id
                                    chanelExists = true;
                                }
                            })
                        }
                    })

                    if (!chanelExists) {
                        let newCh = await mainGuild.channels.create(chanelName,
                            {
                                type: 'text',
                                reason: 'Little Talks'
                            })
                        console.log(defaultChanelId)
                        await this.saveMessage(text, username, chanelName)
                        this.client.channels.cache.get(newCh.id).send(text);
                        this.client.channels.cache.get(defaultChanelId).send(`Nova Mensagem from ${username}`)

                        /** Vou ter que melhorar esta parte em termos de error handling 
                            * O erro que ás vezes dá é o que está no readme
                           */
                        // console.log("ERROR Ao CRIAR UM CANAL!!!!!")
                        // throw err;
                    }
                    else {
                        /** Vem do parametro da funçoum */
                        chanelId = chanelId == null ? defaultChanelId : chanelId
                        await this.saveMessage(text, username, chanelName)
                        this.client.channels.cache.get(chanelId).send(text)
                    }
                } catch (error) {
                    // Mais uma vez acho que isto não resolve o problema do error handling
                    throw error;
                }
            })

            /** Emitir Merdas */
            /** Ao entrar alguém o melhor a fazer era criar um canal que ficasse com o historico das mensagens e depois nem tinha que ser eu a guardar las na BD talvez */
            socket.emit("connection", `New Connection from ${socket.id}`)

            /** Disconnect  */
            socket.on("disconnect", () => {
                console.log("Saiu um")

                socket.broadcast.emit("user left", "A user left")
            })
        })
    }

    /** Vou fazer aqui fora a função para guardar as mensagens que depois é usada em cima */
    async saveMessage(message, username, channelName) {
        try {
            /** Se a mensagem não for guardada copm sucesso vou ter que fazer algo que 
             * avise o user disso
             */
            let saveMsg = await messageController.saveMessages(message, false, username, channelName);
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
                console.log("CHNAME!!!!!!!!!!!!!!!!!!!!", channelName)

                this.client.guilds.cache.forEach((guild) => {
                    if (guild.name == "ServidorBot") {
                        guild.channels.cache.forEach((ch) => {
                            /** IMPORTANTE:
                             * 
                             * Os nomes dos canais são sempre em minusculas
                             */
                            if (ch.type == 'text' && ch.name == channelName) {
                                console.log(ch.type, ch.name, channelName, ch.name == channelName)

                                let txtCh = new Discord.TextChannel(guild, null)
                                let msgCh = new Discord.Message(this.client, null, txtCh);
                                console.log(msgCh, "txt", msgCh.messages.cache)
                                // txtCh.fet00.forEach(msg => {
                                //     console.log("MSG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", msg)
                                // })
                                msgCh.fetch().then(messages => {
                                    console.log(messages)
                                    res(messages)
                                }).catch(err => {
                                    console.log("FODEU", err);
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
    socketIODisc: socketInicialization,
};