const router = require("express").Router();
const { register } = require("../controller/auth.controller");
const authController = require("../controller/auth.controller");

router.post("/login", async (req, res, next) => {
    try {
        let { username, password } = req.body;
        /**
         * Esta funcção deve retornar um objecto com vários campos como
         * sucesso,
         * erro, se houver,
         * pronto é  isso por agora
         */
        console.log(req.cookies)
        let authSuccess = await authController.authenticate(username, password)
        console.log(authSuccess)
        if (authSuccess.success) {
            let token = await authController.createJWT(
                {
                    username: username,
                    idM: authSuccess.data._id 
                });


            // Só estou a conseguir fazer cookies em produção por isso por agora também vai passar a ir no body da resposta, tenho que mudar depois. Devo ter que criar um branch para produção
            res.cookie("jwt", token, { httpOnly: false, maxAge: 900000, path: "/" })
                .send({ success: true, msg: username, data: authSuccess.data, jwt: token })
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
            console.log({registerSuccess})
            /** Devo conseguir fazer um código mai lindo aqui em baixo, com um destructuring */
            let token = null;
            if (registerSuccess.success) {
                token = await authController.createJWT({ username: registerSuccess.data.username, idM: registerSuccess.data._id })
            }
            // Depois o token vai em cookies e não aqui
            res.json({ success: registerSuccess.success, data: registerSuccess.data, token: token })
        }
    } catch (error) {
        next(error)
    }
})

router.post("/verify", async (req, res, next) => {
    try {
        let ver = await authController.verifyJWT(req.body);
        console.log(ver);

        if (ver) {
            res.json({ success: true });
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

    } catch(error) {
        next(error);
    } 
})
module.exports = router;