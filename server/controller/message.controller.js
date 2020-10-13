const message = require("../models/message.model");

module.exports = {
    /**
     * 
     * @param {ChatMessage} getMessagesByCh 
     * @param {String} chName 
     */
    async getMessages(getMessagesByCh, chName) {
        try {
            let messages = await getMessagesByCh(chName);
            console.log(messages)
        } catch(err) {
            
        }
    }
}