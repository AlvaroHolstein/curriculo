const { Schema, model: batatas } = require("../mongoConfig");

const competenciasSchema = new Schema({
    name: {
        type: String
    },
    current: {
        type: Number
    }
})

const competencias = batatas("competencias", competenciasSchema);

module.exports = competencias;