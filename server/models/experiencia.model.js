const { Schema, model } = require("../mongoConfig");

const experienciaSchema = new Schema({
    _id: {
        type: Number
    },
    empresa: {
        type: String
    },
    // Isto vai servir para agrupar os trabalhos no frontend
    identifier: {
        type: String
    },
    data_inicio: {
        type: Date
    },
    data_fim: {
        type: Date
    },
    resumo: {
        type: String
    },
    cargo: {
        type: String
    },
    img: {
        type: String
    }
})

const experiencia = model("trabalhos", experienciaSchema);

module.exports = experiencia;