const messageModel = require("../models/message.model");

module.exports = {

    /** Se o channelName for null é porque foi eu que mandei a mensagem
     * 
     * @param {String} message 
     * @param {Boolean} self 
     * @param {String} username 
     * @param {String} channelName 
     * @param {?String} empresa 
     */
    saveMessages(message, self, username, channelName = null, empresa = null, idMsgDisc) {
        /** Vou guardar as mensagens no Mongo
         * E este método vai ser o que vai ser chamado sempre que guardar uma mensagem.
         */
        // 1. Inserir dados que faltem na mensagem
        channelName = channelName.toLowerCase()
        // if(empresa == null) {
        //     console.log("Está a faltar a empresa")
        // }

        // console.log({message, self, username, channelName, empresa});
        return new Promise((res, rej) => {

            let newMessage = new messageModel({
                message: message,
                self: self,
                username: username,
                empresa: empresa,
                // só falta a data aqui
                channelName: channelName,

                // Debuggin porpuse
                idMsgDisc: idMsgDisc,
                prod: process.env.NODE_ENV == 'production' ? true : false
            })

            newMessage.save(err => {
                if(err) {
                    rej(err);
                    return;
                }

                res(newMessage);
                return;
            })
        })
    },


    /**
     * 
     * @param {String} channelName 
     */
    getMessages(channelName) {
        channelName = channelName.toLowerCase();
        return new Promise((res, rej) => {
            messageModel.find({channelName: channelName}, (err, collection) => {
                if(err) {
                    rej(err);
                    return;
                }

                res(collection);
                return;
            })
        })    
    }
}