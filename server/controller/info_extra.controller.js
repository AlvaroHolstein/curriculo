const infoExtra = require("../models/info_extra.model");

const infoExtraController = {
    getInfoExtra() {
        // Só vai haver uma coisa nesta collection por isso vou fazer um find all
        return new Promise((resolve, reject) => {
            infoExtra.find({}, (err, collection) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(collection);
            })
        })
    }
}

module.exports = infoExtraController;