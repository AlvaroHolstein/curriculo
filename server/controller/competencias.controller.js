const competencias = require("../models/competencias.model");

const competenciasController = {
    getCompetencias() {
        return new Promise((resolve, reject) => {
            competencias.find({}, (err, collection) => {
                if(err) {
                    reject(err);
                    return;
                }

                resolve(collection);
            })
        })
    }
}

module.exports = competenciasController;