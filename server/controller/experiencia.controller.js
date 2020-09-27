const experiencia = require("../models/experiencia.model");

const experienciaController = {
    getTrabalhos() {
        return new Promise((resolve, reject) => {
            experiencia.find({}, (err, data) => {
                if(err) {
                    reject(err);
                    return;
                }

                resolve(data);
            })
        })
    }
}

module.exports = experienciaController;