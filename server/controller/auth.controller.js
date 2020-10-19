const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
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

            // console.log("Fieldtolookfor", fieldToLookfor)
            user.find(fieldToLookfor, (err, collection) => {
                if (err) {
                    returnModel.err = err;
                    // console.log("Ocorreu um erro no login!", returnModel)
                    reject(returnModel);
                    return;
                }

                if (collection.length == 0) {
                    returnModel.err = "No User Found!";
                    // console.log("Não foi encontrado o user", returnModel)
                    reject(returnModel);
                    return;
                }

                /** Só depois disto é que o user pode passar à parte 
                 * de Brincar com as cookies e JWT (funções à parte)
                 */
                // console.log("Chegamos á parte do bcrypt")
                bcrypt.compare(pass, collection[0].password, (errorBcrypt, result /** true ou false */) => {
                    if (result) {
                        returnModel.success = true;
                        returnModel.data = collection[0];
                        // console.log("Funcionou o bcrypt", returnModel)
                        resolve(returnModel);
                        return;
                    }
                    else {
                        returnModel.err = errorBcrypt;
                        // console.log("Fodeu no bcrypt", returnModel);
                        reject(returnModel);
                        return;
                    }
                })

            })
        });
    },

    /** Registar um novo madafakas */
    register({ username, email, empresa, password }) {
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

                    let newUser = new user({ username, email, password: hash, empresa });

                    /** Vou ter que usar o bcrypt se op validate do mongoose der fixe */

                    // console.log("Antes de tentar gravar o user")
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
                            // console.log("Ocorreu um erro ao gravar o user")
                            reject(returnModel);
                            return;
                        }

                        returnModel.success = true;
                        returnModel.data = newUser;

                        // console.log("Correu tudo bem ao gravar o user", returnModel)
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
            user.find({ email: email }, (err, data) => {
                if (err) {
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
            user.find({ username: username }, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                let founded = data.length == 0 ? false : true;
                resolve(founded)
            })
        })
    },
    /** Vou ter que criar aqui uma função que veja se o JWT é válido 
     * Esta função vai ser usada como auxiliar mas também acho que devia ter 
     * um endpoint só para ela porque assim era mais fácil de gerir 
     * as navigations guards do frontend, penso eu de que
     * 
     * @param body Request Body
    */
    verifyJWT({ token, c }, /** multiplicador, multipacado */) {
        return new Promise((resolve, reject) => {
            //1. Verificar a validade do token
            // A função assim é sincrona
            let ver = jwt.verify(token, process.env.JWT_SECRET, (err, ver) => {
                if (err) {
                    reject(err)
                }
                //2. Se válido, testar a resposta que veio no body
                if (c == ver.a * ver.b) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
                //3. Tótil seguro :)
            });
        })
    },
    async middlewareVerification(req, res, next) {
        try {
            // console.log(req.cookies)
            /** Fazer uma voisa para dev e outra para PROD? */
            if (process.env.NODE_ENV == 'production') { //eheh
                console.log("Verification")

                let truBody = null;

                if (req.body.token) {
                    truBody = req.body;
                }
                else if (req.cookies.jwt) {
                    console.log("Cookies no middlewareVerification", req.cookies)
                    truBody.token = req.cookies.jwt;
                    truBody.c = req.cookies.c
                }
                else {
                    console.log("em lado enhum")
                }
                // 1. Token e items para a conta super secreta xD
                let verification = await this.verifyJWT(truBody);
                console.log(verification)
                if (!verification) {
                    next("ERR: JWT - O resultado final está mal")
                    return;
                }
            }
            else {
                /** Por fgazer, mas isto é só um atalho para testar os caminhos */
            }
            console.log("e passou a verification")
            next();
        } catch (error) {
            next(error);
        }
    },
    /** E uma funcção para criar também, só para ter isto limpinho
     * esta funcção vai ser usada no login e no register
     * @param payload
     * @return token String
     */
    createJWT(payload, options = null) {
        /* https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
        
        "payload" could be an object literal, buffer or string representing valid JSON. */
        if (options == null) {
            /** Para o caso de querer options especificas veem nos parametros
             * se não defino as aqui
             */
            options = {
                expiresIn: 7200000
            };
        }

        /** Backdate a jwt 30 seconds (copy paste) */
        payload.iat = Math.floor(Date.now() / 1000) - 30

        /** Super Secure authentication */

        //1.  Criar dois numeros aos calhas para enviar para o frontend
        let a/*multiplicador*/ = Math.floor(Math.random() * 100)
        let b/*multiplicado*/ = Math.floor(Math.random() * 100)

        //2. Inserir os numeros na payload
        payload.a = a;
        payload.b = b;

        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(token)
            })
        })
    },

    /** Vou ter que matar aqui o token */
    logout(token) {
        // Acho que  que vou fazer vai ser por a data de expiração para agora
        //naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah, siiiiiiiiiiiiiiiiiim.....
        return new Promise((res, rej) => {

        })
    }
}