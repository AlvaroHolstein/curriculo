const { Schema, model } = require("../mongoConfig");

/** Como Fazer campos obrigatórios aqui */
const messageSchema = new Schema({
    /** Aqui vou querer receber o _id do mongo */
    message: {
        type: String
    },
    self: {
        type: Boolean
    },
    name: {
        type: String
    },
    empresa: {
        type: String
    },
    date: {
        type: Date,
        default: new Date().toISOString()
    },
    compId: {
        type: Number
    }
});

const message = model("messages", messageSchema);

module.exports = message;