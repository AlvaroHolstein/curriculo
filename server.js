const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const mongoConf = require("./server/mongoConfig");

const escolaRoute = require("./server/routes/escola.route");
const infoExtraRoute = require("./server/routes/info_extra.route");
const experienciaRoute = require("./server/routes/experiencia.route");
const competenciasRoute = require("./server/routes/competencias.route");
const notionRoute = require("./server/routes/notion.route");

// const events = require("events");
// const eventEmitter = new events.EventEmitter();


// Acho que isto está a foder o deploy no heroku
// const port = process.env.NODE_ENV == 'production' ? process.env.portProd : process.env.PORT || 8000;

const port = process.env.PORT || 8000;

const server = express();
if (
  !process.argv.includes("--no-initial-log") &&
  process.env.NODE_ENV != "production"
) {
  console.log("Tou mal se estou a aparecer no EM PROD!");
  const morgan = require("morgan");

  server.use(morgan("tiny"));
}

server.use(cookieParser()); // Não sei se vai ficar só assim no fim, update: porquê?
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// const httpServer = require("http").createServer(server);

// Este fica aqui por causa do httpServer
// const io = require("socket.io")(httpServer);
// let { SocketInit } = require("./server/socket")
// let scInit = new SocketInit(io);

// Assim o discord só inicia uma vez
// let { discInit, defaultChanelId } = require("./server/disc.js");

// let socketDiscComunications = require("./server/disc_guilds/socketio_discordjs_comunications");

// try {
//     socketDiscComunications(scInit, discInit, defaultChanelId, eventEmitter)
// } catch (err) {
//     console.log("Fodeu ao ligar o WebSocket ou o 'cliente' do discord!!!");
// }


// const authenticationRoute = require("./server/routes/auth.route")(eventEmitter);

// const socket = require("./server/socket");
// const messagesRoute = require("./server/routes/message.route")(scInit);

// const authMiddleware = require('./server/controller/auth.controller').middlewareVerification;

/** Cookie management
 * Ver se depois não é preciso passar isto para outro ficheiro
 */
server.use((req, res, next) => {
  if (process.env.NODE_ENV) {
    // Este header estava a não deixar pedidos de outros dominios por ser demasiado abrangente xD
    res.header("Access-Control-Allow-Origin", "*");
    // console.log("Cookies: ", req.cookies )
  }
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  /** Vai servir para ir vendo as cookies */
  // console.log("Cookies: ", req.cookies);
  // console.log("Signed Cookies: ", req.signedCookies);
  // console.log("Headers Cookies:", req.headers.cookie)
  // console.log("Headers: ", req.headers)
  next();
});

// server.use("/api/auth/", authenticationRoute);

server.use("/api/escola/", escolaRoute);
server.use("/api/infoextra/", infoExtraRoute);
server.use("/api/exp/", experienciaRoute);
server.use("/api/competencias/", competenciasRoute);
server.use("/api/notion", notionRoute)
// server.use("/api/msg", messagesRoute);

server.use(
  "/",
  express.static(path.join(process.cwd(), "/curriculo_frontend/dist/"))
);

server.get("/api/", (req, res) => {
  res.json({ success: true, msg: "A funcionar, bem vindo À api!!!" });
});

// Just to get the Changes to be done file (changes-missing.md)
server.get("/api/extra-info", async (req, res, next) => {
  /** Ler o que o ficheiro contém e enviar lo na resposta */
  function readFile() {
    return new Promise((res, rej) => {
      const filePath = path.join(__dirname, "server/changes-missing.md");
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          rej(err);
          return;
        }

        res(data);
      });
    });
  }
  try {
    let fileData = await readFile();
    res.json({ success: true, data: fileData });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

/** Era engraçado ter isto */
// server.get('/api/disc/numberusers', (req, res) => {
//     res.json({success: true, n: socketIODisc.getUsersCon()})
// })

server.use((err, req, res, next) => {
  // console.log("Ocorreu um erro que foi apanhado no server.js Error middleware!!!", err);
  res.json({ success: false, err: err });
});

let sheet = server.listen(port, () => {
  if (process.argv.includes("--clear-console")) {
    console.clear();
  } else {
    console.log('\n')
  }


  if (!process.argv.includes("--no-logs")) {
    console.log(`Servidor a correr no port ${port}`);
  }
});
//Isto estava a faltar IMPORTANTE: (https://stackoverflow.com/questions/41943929/cannot-get-socket-io-eio-3transport-pollingt-ldmmkyz/41945228#41945228)
// io.listen(sheet)
