const message = require("../models/message.model");
const companyComs = require("../disc_guilds/company_comunication");

function messageController(discCli) {
    // cc = companyComs
    let cc = companyComs(null, discCli);

    // O  compId vai ter que ser gerido por mim
    // Depois vai dar para fazer umas brincadeiras para personalizar as comunicações
    function getMessages(compId) {
        return new Promise((reject, resolve) => {
            console.log(compId)
            cc.createChannel(resolve, reject, com)
        })
    }
}

module.exports = messageController;