const { Schema, model } = require("../mongoConfig");

const experienciaSchema = new Schema({
    _id: {
        type: Number
    },
    empresa: {
        type: String
    }
})

const experiencia = model("trabalhos", experienciaSchema);

module.exports = experiencia;