const router = require("express").Router();
const experienciaController = require("../controller/experiencia.controller");
router.get("/", async (req, res, next) => {
    try {
        let response = await experienciaController.getTrabalhos();

        res.json({success: true, data: response});
    } catch (err) {
        next(err);
    }
})

module.exports = router;