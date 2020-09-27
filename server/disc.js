const Discord = require("discord.js");
const client = new Discord.Client();

/** Criar um novo token para o bot do discord
 * Tenho que criar os chats
 * Vai ser preciso mandar as mensagens só para um canal de texto em especifico
 * ou seja, para o ServidorBot > (Canal de texto) curriculo
 */

const discordToken = process.env.DISCORD_TOKEN;

client.on('ready', () => {
    console.log("O Discord Já está a correr sem erros em principio");
})

client.on("message", (msg) => {
    /** Aqui vai ser onde a minha mensagem é recebida e depois enviada para 
     * o frontend
     */
    console.log("CHegou uma mensagem ao discord disc.js", msg);
})

client.login(discordToken);
module.exports = client;