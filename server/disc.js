require("dotenv").config()
const Discord = require("discord.js");
const client = new Discord.Client();


// const messageController = require("./controller/message.controller");

const discordToken = process.env.DISCORD_TOKEN;
const chanelId = process.env.DISCORD_CHANEL_ID;
/**
 * Vou criar uma funcção com um array que vai ser limpo a cada X mensagens
 * que assim não preciso de estar a meter um timeout praqui po meio
 * se este tiver cheio
 * este array vai ter  as uktimas mensagens recebidas
 * se as mensagens repetidas tiveram o mesmo id (do discord)
 * primeiro vou checkar se o id a gravar já exite e se existir nem mando nem guardo
 * 
 * 
 * Discord Events
 * https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584
 */

async function discordInit() {
   try {

    // Vou limpar quando chegar ás 20 mensagens
    let contadorParaLimparMensagens = 0;
    let msgArr = [];
    let successfullyStarted = false;

    /** Criar um novo token para o bot do discord
     * Tenho que criar os chats
     * Vai ser preciso mandar as mensagens só para um canal de texto em especifico
     * ou seja, para o ServidorBot > (Canal de texto) curriculo
     */
    client.on('ready', () => {
        successfullyStarted = true;
        console.log("O Discord Já está a correr sem erros em principio");
    })

    client.on('error', (error) => {
        /** Vou ter que fazer uma coisa mais bonita para os logs de erros 
         * e depois também para o logs de entrada, last login e por ai adiante
         */
        console.log(error)
    })

    client.on('disconnect', event => {
        // Vou avisar quando não estiver online
        // Mas posso tar no tele e não no pc, testar !!!
        console.log("Disconectei me do discord e isto é o evento: ", event)
    })



    /** Se der return true não é para mandar nem gravar
     * se der false seguesse
     * 
     * @param {object} param0 - Message Instance i think... 
     * @return {boolean} isDuplicated - Needs to be `false` to save ...
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

    if (!successfullyStarted) {
        console.log("A Entrar no Discord API");
        await client.login(discordToken)
    }
  

    return client;
} catch (err) {
    console.log("Erro ao fazer login pelo discord !!!", err)
    throw err;
}
}



module.exports = {
    discInit: discordInit,
    defaultChanelId: chanelId
};

(async () => {
    await discordInit();
})();