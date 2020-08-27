const { Schema, model } = require("../mongoConfig");

const escolaSchema = new Schema({
    _id: {
        type: Number
    },
    nome: {
        type: String
    },
    nome_curso: {
        type: String
    },
    data_inicio: {
        type: String
    },
    data_fim: {
        type: String
    },
    localidade: {
        type: String
   }
})

const escola = model("escolas", escolaSchema);

module.exports = escola;