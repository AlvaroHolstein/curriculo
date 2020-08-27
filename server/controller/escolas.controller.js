const escola = require("../models/escolas.model");

const escolasController = {
    getEscolas() {
        // let escolas = []
        return new Promise((resolve, reject) => {
            escola.find({}, (err, data) => {
                // Apanhar este erro nos routes e enviar num next
                if(err) reject(err);
                console.log(data)
                resolve(data);
            })
        })
    }
}

module.exports = escolasController;