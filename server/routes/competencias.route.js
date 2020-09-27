const router = require("express").Router();
const competenciasController = require("../controller/competencias.controller");
const competencias = require("../models/competencias.model");

router.get("/", async (req, res, next) => {
    try {
        let data = await competenciasController.getCompetencias();

        res.json({success: true, data: data});
    } catch (err) {
        next(err);
    }
})

module.exports = router;