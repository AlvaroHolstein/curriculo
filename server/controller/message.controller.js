const { collection } = require("../models/message.model");
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
            // Assim evita duplicações de certeza
            // messageModel.find({idMsgDisc: idMsgDisc}, (error, collection) => {
            //     if(error) rej(error)
            // console.log("coo", collection)
            // if(collection.length == 0) {
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
                if (err) {
                    rej(err);
                    return;
                }

                // console.log("GRAVOUUUUUUUUUUUU!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                res(newMessage);
                return;
            })
            // }
            // res({succes: false})
        })
        // })
    },


    /**
     * 
     * @param {String} channelName 
     */
    getMessages(channelName) {
        channelName = channelName.toLowerCase();

        if (channelName.split(" ").length > 1) {
            channelName = channelName.split(" ").join("-")
        }
        let auxName = channelName.split('5f');
        let newName = "";

        if (channelName.split("_").length == 1) {

            for (let i = 0; i < auxName.length; i++) {
                if (i == 0) {
                    newName = auxName[i] + "_5f"
                }
                else {
                    newName += auxName[i]
                }
            }

        }
        // console.log("GETMESSAGES", newName)
        return new Promise((res, rej) => {
            // console.log("Names !!!!!!!!!!", newName, channelName)
            messageModel.find({ $or: [{ "channelName": channelName }, { "channelName": newName }] }, (err, collection) => {
                if (err) {
                    rej(err);
                    return;
                }
                // console.log(collection)
                res(collection);
                return;
            })
        })
    }
}