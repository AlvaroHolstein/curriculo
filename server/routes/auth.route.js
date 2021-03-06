const router = require("express").Router();
const { register } = require("../controller/auth.controller");
const authController = require("../controller/auth.controller");

function authRouterInitializer(eventEmitter) {

    router.post("/login", async (req, res, next) => {
        try {
            let { username, password } = req.body;
            /**
             * Esta funcção deve retornar um objecto com vários campos como
             * sucesso,
             * erro, se houver,
             * pronto é  isso por agora
             */
            // console.log("entrou no login")
            let authSuccess = await authController.authenticate(username, password)
            // console.log("Depois de ver o user", authSuccess)
            if (authSuccess.success) {
                let token = await authController.createJWT(
                    {
                        username: username,
                        idM: authSuccess.data._id
                    });

                // Vai emitir para o discord
                eventEmitter.emit("enteredApp", { username: username, login: true })

                // console.log("successo na autenticaçãpo", authSuccess)
                // Só estou a conseguir fazer cookies em produção por isso por agora também vai passar a ir no body da resposta, tenho que mudar depois. Devo ter que criar um branch para produção
                res.cookie("jwt", token, { httpOnly: process.env.NODE_ENV == 'production' ? true : false, maxAge: 900000 });
                res.send({ success: true, msg: username, data: authSuccess.data, jwt: token })
            }
            else {
                next("User nao encontrado");
            }
        } catch (error) {
            next(error);
        }
    })

    router.post("/register", async (req, res, next) => {
        try {
            let exists = await Promise.all([authController.existsUsername(req.body.username), authController.existsEmail(req.body.email)])
            let errorMsg = "";

            // console.log("Entrou no Register")

            if (exists[0] == true) {
                /** é esta a ordem porque é  a primeira função no array do promise all */
                errorMsg = "Já existe um utilizador com esse Username \n";
            }
            if (exists[1]) {
                errorMsg += "Já existe um utilizador com esse Email";
            }

            if (errorMsg != "") {
                res.json({ success: false, err: errorMsg });
            }
            else {
                let registerSuccess = await authController.register(req.body);
                // console.log("Resposta ao criar user", registerSuccess)
                /** Devo conseguir fazer um código mai lindo aqui em baixo, com um destructuring */
                let token = null;
                if (registerSuccess.success) {
                    token = await authController.createJWT({ username: registerSuccess.data.username, idM: registerSuccess.data._id })
                    eventEmitter.emit("enteredApp", { username: registerSuccess.data.username, login: false })
                    // console.log("Este é o token", token)
                }

                // console.log("parte final de registo", { registerSuccess });
                // Depois o token vai em cookies e não aqui
                res.cookie("jwt", token, { httpOnly: process.env.NODE_ENV == 'production' ? true : false, maxAge: 900000 });
                res.json({ success: registerSuccess.success, data: registerSuccess.data, token: token })
            }
        } catch (error) {
            // console.log("Fodeu no Register (catch final no auth route)", error)
            next(error)
        }
    })

    router.post("/verify", async (req, res, next) => {
        try {
            let ver = await authController.verifyJWT(req.body);
            if (ver.success) {
                res.json({ success: true, data: ver.data });
            }
            else {
                res.json({ success: false });
            }
        } catch (error) {
            next(error);
            return;
        }
    })

    /** Vou precisar disto para "matar" tokens */
    router.post("/logout", async (req, res, next) => {
        try {
            // Alterar a 
            let logout = authController.logout(req.body.token);
            res.json({ success: true })
        } catch (error) {
            next(error);
        }
    })
    return router;
}
module.exports = authRouterInitializer;