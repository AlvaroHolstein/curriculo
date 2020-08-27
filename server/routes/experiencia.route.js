const router = require("express").Router();
const experienciaController = require("../controller/experiencia.controller");
router.get("/", async (req, res, next) => {
    try {
        let response = await experienciaController.getTrabalhos();

        console.log(response);
        res.json({success: true, data: response});
    } catch (err) {
        next(err);
    }
})

module.exports = router;