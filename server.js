const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// Acho que isto está a foder o deploy no heroku
// const port = process.env.NODE_ENV == 'production' ? process.env.portProd : process.env.PORT || 8000;

const port = process.env.PORT || 8000;


const server = express();

if (process.env.NODE_ENV != 'production') {
    const morgan = require("morgan")

    server.use(morgan('tiny'))
}

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

const authMiddleware = require('./server/controller/auth.controller').middlewareVerification;

/** Cookie management
 * Ver se depois não é preciso passar isto para outro ficheiro
 */
server.use((req, res, next) => {
    
    if (process.env.NODE_ENV) {
        // Este header estava a não deixar pedidos de outros dominios por ser demasiado abrangente xD
        res.header('Access-Control-Allow-Origin', "*");
        console.log("Cookies: ", req.cookies )
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    /** Vai servir para ir vendo as cookies */
    // console.log("Cookies: ", req.cookies);
    // console.log("Signed Cookies: ", req.signedCookies);
    // console.log("Headers Cookies:", req.headers.cookie)
    next();
})

server.use("/api/auth/", authenticationRoute);

server.use("/api/escola/", authMiddleware, escolaRoute);
server.use("/api/infoextra/", authMiddleware, infoExtraRoute);
server.use("/api/exp/", authMiddleware, experienciaRoute);
server.use("/api/competencias/", authMiddleware, competenciasRoute);
server.use("/api/msg", authMiddleware, messagesRoute);


server.use("/", express.static(path.join(process.cwd(), "/curriculo_frontend/dist/")))

server.get("/api/", (req, res) => {
    res.json({ success: true, msg: "A funcionar, bem vindo À api!!!" })
})

// Just to get the Changes to be done file (changes-missing.md)
server.get("/api/extra-info", async (req, res, next) => {
    /** Ler o que o ficheiro contém e enviar lo na resposta */
    function readFile() {
        return new Promise((res, rej) => {
            const filePath = path.join(__dirname, 'server/changes-missing.md')
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    rej(err);
                    return;
                }

                res(data)
            })
        })
    }
    try {
        let fileData = await readFile();
        res.json({ success: true, data: fileData })
    } catch (err) {
        res.json({ success: false, error: err })
    }
})

/** Era engraçado ter isto */
// server.get('/api/disc/numberusers', (req, res) => {
//     res.json({success: true, n: socketIODisc.getUsersCon()})
// })

server.use((err, req, res, next) => {
    // console.log("Ocorreu um erro que foi apanhado no server.js Error middleware!!!", err);
    res.json({ success: false, err: err })
})

let sheet = server.listen(port, () => {
    console.log(`Servidor a correr no port ${port}`);
})
//Isto estava a faltar IMPORTANTE: (https://stackoverflow.com/questions/41943929/cannot-get-socket-io-eio-3transport-pollingt-ldmmkyz/41945228#41945228)
io.listen(sheet)