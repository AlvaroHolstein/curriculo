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
const {discInit, chanelId} = require("./disc.js");

const ohthecoms = require("./disc_guilds/company_comunication");


function socketInicialization(io) {

    io.on("connection", socket => {
        const client = discInit(socket);

        /** Perceber se este connect é só para os clientes, mas acho que sinhe */
        /**
         * Aqui os utilizadores só são conectados depois de passarem da página auth
         */
        console.log("Entrou Mais um");

        socket.on("mess", (data) => {
            /** Vai ser aqui que vou mandar as mensagens para o discord
             * AIIIIIIII
             */

            console.log("Received message", { data })
            client.channels.cache.get(chanelId).send(data)
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