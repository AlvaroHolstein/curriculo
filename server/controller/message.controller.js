const message = require("../models/message.model");

const messageController = {
    // O  compId vai ter que ser gerido por mim
    // Depois vai dar para fazer umas brincadeiras para personalizar as comunicações
    getMessages(compId) {
        return new Promise((reject, resolve) => {

            message.find({ compId: compId }, (err, collection) => {
                if (err) reject(err);
                resolve(collection); 
            })
        })
    }
}

module.exports = messageController;