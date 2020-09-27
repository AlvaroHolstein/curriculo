const express = require("express");
const cors = require("cors");
const path = require("path")
// const discordClient = require("./server/disc.js")

const server = express();

require("dotenv").config();

const mongoConf = require("./server/mongoConfig");

const escolaRoute = require("./server/routes/escola.route");
const infoExtraRoute = require("./server/routes/info_extra.route");
const experienciaRoute = require("./server/routes/experiencia.route");
const competenciasRoute = require("./server/routes/competencias.route");
const messagesRoute = require("./server/routes/message.route");

const port = process.env.PORT || 8000;


server.use(cors());

const socketIODisc = require("./server/socket");

server.use("/api/escola/", escolaRoute);
server.use("/api/infoextra/", infoExtraRoute);
server.use("/api/exp/", experienciaRoute);
server.use("/api/competencias/", competenciasRoute);
server.use("/api/msg", messagesRoute);


server.use("/", express.static(path.join(process.cwd(), "/curriculo_frontend/dist/")))
server.get("/api/", (req, res) => {
    res.json({success: true, msg: "A funcionar, bem vindo À api!!!"})
})

server.use((err, req, res, next) => {
    console.log("Ocorreu um erro que foi apanhado no server.js Error middleware!!!", err);
    res.json({success: false, err: err})
})

server.listen(port, () => {
    console.log(`Servidor a correr no port ${port}`);
})