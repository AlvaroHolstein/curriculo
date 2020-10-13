const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const discordClient = require("./server/disc.js")
require("dotenv").config();

const port = process.env.PORT || 8000;


const server = express();

server.use(cookieParser()); // Não sei se vai ficar só assim no fim
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())

const httpServer = require("http").createServer(server);

const io = require("socket.io")(httpServer);
let { socketIODisc } = require("./server/socket")
let MyDisc = new socketIODisc(io);




const mongoConf = require("./server/mongoConfig");

const authenticationRoute = require("./server/routes/auth.route");

const escolaRoute = require("./server/routes/escola.route");
const infoExtraRoute = require("./server/routes/info_extra.route");
const experienciaRoute = require("./server/routes/experiencia.route");
const competenciasRoute = require("./server/routes/competencias.route");
const messagesRoute = require("./server/routes/message.route")(MyDisc);
// const socketInicialization = require("./server/socket");


/** Cookie management
 * Ver se depois não é preciso passar isto para outro ficheiro
 */
server.use((req, res, next) => {

    // Este header estava a não deixar pedidos de outros dominios por ser demasiado abrangente xD
    // res.header('Access-Control-Allow-Origin', "*/*");

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    /** Vai servir para ir vendo as cookies */
    // console.log("Cookies: ", req.cookies);
    // console.log("Signed Cookies: ", req.signedCookies);
    // console.log("Headers Cookies:", req.headers.cookie)
    next();
})

server.use("/api/auth/", authenticationRoute);

server.use("/api/escola/", escolaRoute);
server.use("/api/infoextra/", infoExtraRoute);
server.use("/api/exp/", experienciaRoute);
server.use("/api/competencias/", competenciasRoute);
server.use("/api/msg", messagesRoute);


server.use("/", express.static(path.join(process.cwd(), "/curriculo_frontend/dist/")))
server.get("/api/", (req, res) => {
    res.json({ success: true, msg: "A funcionar, bem vindo À api!!!" })
})

// server.get('/api/disc/numberusers', (req, res) => {
//     res.json({success: true, n: socketIODisc.getUsersCon()})
// })

server.use((err, req, res, next) => {
    console.log("Ocorreu um erro que foi apanhado no server.js Error middleware!!!", err);
    res.json({ success: false, err: err })
})

let sheet = server.listen(port, () => {
    console.log(`Servidor a correr no port ${port}`);
})
//Isto estava a faltar IMPORTANTE: (https://stackoverflow.com/questions/41943929/cannot-get-socket-io-eio-3transport-pollingt-ldmmkyz/41945228#41945228)
io.listen(sheet)