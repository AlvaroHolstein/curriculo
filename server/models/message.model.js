const { Schema, model } = require("../mongoConfig");

/** Como Fazer campos obrigatórios aqui */
const messageSchema = new Schema({
    /** Aqui vou querer receber o _id do mongo */
    message: {
        type: String,
        required: true
    },
    self: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    empresa: {
        type: String
    },
    date: {
        type: Date,
        /** Porque é a data em que realmente chega ao servidor */
        default: new Date().toISOString()
    },
    // Vai ser o elemento unico para além do _id
    channelName: {
        type: String,
        required: true
    }
});

const message = model("messages", messageSchema);

module.exports = message;