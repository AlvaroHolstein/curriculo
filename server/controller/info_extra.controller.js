const infoExtra = require("../models/info_extra.model");

const infoExtraController = {
    getInfoExtra() {
        // Só vai haver uma coisa nesta collection por isso vou fazer um find all
        return new Promise((resolve, reject) => {
            infoExtra.find({}, (err, collection) => {
                if(err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                console.log("collection",collection)
                resolve(collection);
            })
        })
    }
}

module.exports = infoExtraController;