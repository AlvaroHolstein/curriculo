const router = require("express").Router();
const infoExtraController = require("../controller/info_extra.controller");

router.get("/", async (req, res, next) => {
    try {
        let response = await infoExtraController.getInfoExtra()
        
        res.json({success: true, data: response});
    } catch (err) {
        next(err)
    }
})

module.exports = router;
