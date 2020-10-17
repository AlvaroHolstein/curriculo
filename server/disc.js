const Discord = require("discord.js");
const client = new Discord.Client();

const messageController = require("./controller/message.controller");

const discordToken = process.env.DISCORD_TOKEN;
const chanelId = process.env.DISCORD_CHANEL_ID;

function discordInit(socket) {
    /** Criar um novo token para o bot do discord
     * Tenho que criar os chats
     * Vai ser preciso mandar as mensagens só para um canal de texto em especifico
     * ou seja, para o ServidorBot > (Canal de texto) curriculo
     */
    client.on('ready', () => {
        console.log("O Discord Já está a correr sem erros em principio");
    })

    client.on("message", async (msg) => {
        try {
            /** Aqui vai ser onde a minha mensagem é recebida e depois enviada para 
         * o frontend
         */
            // console.log("CHegou uma mensagem ao discord disc.js", msg.author);
            /**
             * Para diferenciar quando é uma mensagem enviada por mim ou pelo bot
             * msg.author.bot ...
             */

            // Enviar a mensagem para o frontend
            if (msg.author.bot) { }
            else {
                // Tenho que fazer uma funcçã oque envie as mensagens para frontend
                // Vou precisar do nome do canal para saber para onde eu mandei as mensagens
                await messageController.saveMessages(msg.content, true, msg.author.username, msg.channel.name);
                socket.emit("messageDisc", msg.content)
            }
        } catch (error) {
            console.log("Aconteceu um erro no discord no .on('message')", error);
            throw error;
        }
    })

    client.login(discordToken);
    return client;
}
module.exports = {
    discInit: discordInit,
    defaultChanelId: chanelId
};