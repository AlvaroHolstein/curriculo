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
const { ClientUser } = require("discord.js");

// Este channelId já não vai ser preciso, e dai pode servir para ser o default channel ...
let { discInit, defaultChanelId } = require("./disc.js");
const jwt = require("jsonwebtoken");

const ohthecoms = require("./disc_guilds/company_comunication");
const { param } = require("./routes/auth.route.js");


function socketInicialization(io) {
    io.on("connection", socket => {
        /** Tá aqui a Inicialização do Discord Client para aqui, 
         * Acho que deve ser sermpre esta "variável" que deve ser usada na aplicação
         */
        const client = discInit(socket);

        /** Vou ter que criar um role para atribuir aos canais criados penso eui de que mas aqu bai */
        let role = null;

        /** Perceber se este connect é só para os clientes, mas acho que sinhe */
        /**
         * Aqui os utilizadores só são conectados depois de passarem da página auth
         */
        console.log("Entrou Mais um", socket.id);
        socket.on("mess", async ({ text, token }) => {
            let chanelExists = false;
            let chanelId = null;
            console.log("Receive Message On Socket file !!!!!")
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
            client.guilds.cache.forEach((guild) => {
                if (guild.name == "ServidorBot") {
                    mainGuild = guild;
                    guild.channels.cache.forEach((ch) => {
                        /** IMPORTANTE:
                         * 
                         * Os nomes dos canais são sempre em minusculas
                         */
                        if (ch.type == 'text' && ch.name == chanelName.toLowerCase()) {
                            console.log(ch.name, ch.id)
                            chanelId = ch.id
                            chanelExists = true;
                        }
                    })
                }
            })

            if (!chanelExists) {
                mainGuild.channels.create(chanelName, {
                    type: 'text',
                    reason: 'Little Talks'
                }).then((newCh) => {
                    console.log(defaultChanelId)
                    client.channels.cache.get(newCh.id).send(text)
                    client.channels.cache.get(defaultChanelId).send(`Nova Mensagem from ${username}`)
                }).catch((err) => {
                    /** Vou ter que melhorar esta parte em termos de error handling 
                        * O erro que ás vezes dá é o que está no readme
                       */
                    console.log("ERROR Ao CRIAR UM CANAL!!!!!")
                    throw err;
                })
            }
            else {
                /** Vem do parametro da funçoum */
                chanelId = chanelId == null ? defaultChanelId : chanelId
                client.channels.cache.get(chanelId).send(text)
            }
        })

        /** Emitir Merdas */
        /** Ao entrar alguém o melhor a fazer era criar um canal que ficasse com o historico das mensagens e depois nem tinha que ser eu a guardar las na BD talvez */
        socket.emit("connection", "AIIIIIIIIIIII")

        /** Disconnect  */
        socket.on("disconnect", () => {
            console.log("Saiu um")

            socket.broadcast.emit("user left", "A user left")
        })
    })

    // io.listen(port+1);// acho que isto afinal não vai ser preciso, update num é
}

module.exports = socketInicialization;