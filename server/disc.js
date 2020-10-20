const Discord = require("discord.js");
const client = new Discord.Client();

const messageController = require("./controller/message.controller");

const discordToken = process.env.DISCORD_TOKEN;
const chanelId = process.env.DISCORD_CHANEL_ID;
/**
 * Vou criar uma funcção com um array que vai ser limpo a cada X mensagens
 * que assim n\ao preciso de estar a meter um timeout praqui po meio
 * se este tiver cheio
 * este array vai ter  as uktimas mensagens recebidas
 * se as mensagens repetidas tiveram o mesmo id (do discord)
 * primeiro vou checkar se o id a gravar já exite e se existir nem mando nem guardo
 */

function discordInit(socket) {
    // Vou limpar quando chegar ás 20 mensagens
    let contadorParaLimparMensagens = 0;
    let msgArr = [];

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
                // console.log("Mensagem vinda do Discord", msg.author, msg.id)

                /**
                 * A msg tem:
                 * - id
                 */
                if (!isDuplicated(msg)) {
                    await messageController.saveMessages(msg.content, true, msg.author.username, msg.channel.name, "", msg.id);
                    socket.emit("messageDisc", msg.content) // é o que manda pro fronted
                }

                if (contadorParaLimparMensagens >= 20) {
                    // Limpar arr
                    msgArr = [];
                    contadorParaLimparMensagens = 0;
                }
                else {
                    contadorParaLimparMensagens++;
                }
                // console.log("contador" + contadorParaLimparMensagens);
                // console.log("----------------------------------------")

            }
        } catch (error) {
            // console.log("Aconteceu um erro no discord no .on('message')", error);
            throw error;
        }
    })



    /** Se der return true não é para mandar nem gravar
     * se der false seguesse
     * 
     * @param {msg} param0 
     */
    function isDuplicated({ id }) {
        // console.log("id da mensagem", id);
        let isDuplicated = false;
        if (msgArr.includes(id)) {
            // console.log("Estava duplicada id:" + id);
            isDuplicated = true;
        } else {
            // console.log("Não estava duplicada id: " + id);
            msgArr.push(id)
        }
        return isDuplicated;
    }

    client.login(discordToken);
    return client;
}



module.exports = {
    discInit: discordInit,
    defaultChanelId: chanelId
};