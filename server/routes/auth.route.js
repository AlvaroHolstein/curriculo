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
        let authSuccess = await authController.authenticate(username, password)
        if (authSuccess.success) {
            res.json({ success: true, msg: username, data: authSuccess.data })
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
        let registerSuccess = await authController.register(req.body);
        /** Devo conseguir fazer um código mai lindo aqui em baixo, com um destructuring */
        res.json({success: registerSuccess.success, data: registerSuccess.data})
    } catch (error) {
        next(error)
    }
})
module.exports = router;