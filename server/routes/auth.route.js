const router = require("express").Router();
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
        if (authSuccess.success) {
            let token = await authController.createJWT({ username: username });


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
            /** Devo conseguir fazer um código mai lindo aqui em baixo, com um destructuring */
            let token = null;
            if (registerSuccess.success) {
                token = await authController.createJWT({ username: req.body.username })
            }
            res.json({ success: registerSuccess.success, data: registerSuccess.data })
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
            res.json({success: true});
        }
        else {
            res.json({success: false});
        }
    } catch (error) {
        next(error);
        return;
    }
})
module.exports = router;