const { Schema, model } = require("../mongoConfig");

/** Ainda vou acrescentar coisas aqui */
const infoExtraSchema = new Schema({
    _id: {
        type: Number
    },
    resumo: {
        type: String
    }
})

const infoExtra = model("information", infoExtraSchema);

module.exports = infoExtra;
