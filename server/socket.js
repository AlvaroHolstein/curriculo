/** Vai ser aqui que as mensagens vão ser recebidas primariamnete,
 * e enviadas....
 * 
 * É capaz de haver merda quando mandar isto para o heroku, por causa do port...
 * Mas por agora se funcionar em localhost tá bem lindo.
 */

// Vai ser preciso saber se está a correr em produção ou development
const port = process.env.PORT + 1 || 8001;
const io = require("socket.io")();
const discordBot = require("./disc");

io.on("connect", socket => {
    /** Perceber se este connect é só para os clientes, mas acho que sinhe */
    console.log("Entrou Mais um", { socket });

    socket.on("message", (data) => {
        /** Vai ser aqui que vou mandar as mensagens para o discord
         * AIIIIIIII
         */

        console.log("Received message", {data})
        
    })
})

io.listen(port);