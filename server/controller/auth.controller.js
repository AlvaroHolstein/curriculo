const user = require("../models/user.model");

/** Porque caralhos isto tem 1 vulnerabilitie high (npm audit maixtarde) */
const bcrypt = require("bcrypt");

/** Vai haver a possiblidade de ser guest, mas um guest não vai poder mandar mensages...?
 * Por agora a unica diferença é que o uitilizador vai ter um nome quando mandar mensagem,
 * enquanto que um guest não o vai ter xD
 */
module.exports = {
    /** Vai servir para fazer o Logine */
    authenticate(username, pass) {
        /** Vai ser aqui que vou usar o bcrypt,
         * depois de ver se o username existe ou não
         * 
         * Podia verificar se é um email e caso seja o campo 
         * que vou procurar é o email em vez do username
         */
        let returnModel = {
            success: false,
            err: null,
            data: null
        }
        return new Promise((resolve, reject) => {
            let fieldToLookfor = {}
            let loginField = username.split("@").length
            if (loginField == 1) {
                fieldToLookfor = { username: username }
            }
            else if (loginField == 2) {
                fieldToLookfor = { email: username }
            }
            console.log(fieldToLookfor)
            user.find(fieldToLookfor, (err, collection) => {
                if (err) {
                    returnModel.err = err;
                    reject(returnModel);
                    return;
                }

                if (collection.length == 0) {
                    console.log(collection, err)
                    returnModel.err = "No User Found!";
                    reject(returnModel);
                    return;
                }

                /** Só depois disto é que o user pode passar à parte 
                 * de Brincar com as cookies e JWT (funções à parte)
                 */
                bcrypt.compare(pass, collection[0].password, (errorBcrypt, result /** true ou false */) => {
                    if (result) {
                        returnModel.success = true;
                        returnModel.data = collection;
                        resolve(returnModel);
                        return;
                    }
                    else {
                        returnModel.err = errorBcrypt;
                        reject(returnModel);
                        return;
                    }
                })

            })
        });
    },

    /** Registar um novo madafakas */
    register({ username, email, password }) {
        return new Promise((resolve, reject) => {
            const saltRounds = 10;
            let returnModel = {
                success: false,
                err: null,
                data: null
            }
            if (username != "" && email != "" && password != "") {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        returnModel.err = err;
                        reject(returnModel)
                        return;
                    }

                    let newUser = new user({ username, email, password: hash });

                    // console.log({ newUser, username, email, password, hash });

                    /** Vou ter que usar o bcrypt se op validate do mongoose der fixe */
                    newUser.save(err => {
                        /** Ainda tenho que decidir o que fazer depois do register:
                         * - Mandar o user diretamente para a página de login
                         *  - Mas:
                         *  - Enviar mail de confirtmação?
                         *  - Enviar os dados do utilizador já por aqui?
                         *  - Ou fazer com que tenha que fazer um pedido para a rota de login
                         * logo a seguir a fazer o registo.....?
                         */
                        if (err) {
                            returnModel.err = err;
                            reject(returnModel);
                            return;
                        }

                        returnModel.success = true;
                        resolve(returnModel);
                        return
                    })
                })
            }
        })
    },
    /** Funcção para ver se já exite algum utilizador com
     * username ou
     * email
     * igual ao que chega do frontend
     * @param email String
     * @param username String
     * 
     */
    existsEmail(email) {
        return new Promise((resolve, reject) => {
            user.find({email: email}, (err, data) => {
                if(err) {
                    reject(err);
                    return;
                }
                let founded = data.length == 0 ? false : true;
                resolve(founded)
            })
        })
    },
    existsUsername(username) {
        return new Promise((resolve, reject) => {
            user.find({username: username}, (err, data) => {
                if(err) {
                    reject(err);
                    return;
                }
                let founded = data.length == 0 ? false : true;
                resolve(founded)
            })
        })
    }
}