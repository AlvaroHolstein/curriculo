const router = require("express").Router();
const notionController = require("../controller/notion.controller");
const notionDB = new notionController();

router.get("/", async (req, res, next) => {
    try {
        let data = await notionDB.getResultsFromDB();

        res.json({success: true, data: data});
    } catch (err) {
        console.log("fds", err)
        next(err.toString());
    }
})

module.exports = router;