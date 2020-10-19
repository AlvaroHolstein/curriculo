const router = require("express").Router();
const escolaController = require("../controller/escolas.controller");
const escola = require("../models/escolas.model");

router.get("/", async (req, res, next) => {
    try { 
       let response = await escolaController.getEscolas();
        // console.log("escolas route", response)
       res.json({success: true, data: response});
    } catch (err) {
        next(err);
    }
})

module.exports = router;