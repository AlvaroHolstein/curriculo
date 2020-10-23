// Mais tarde vai sair da pasta disc_guilds

const messageController = require("../controller/message.controller");
const jwt = require("jsonwebtoken");
// Este ficheiro vai conter uma função
// Que só vai ser chamada uma vez
module.exports = function (socketFromAbove, disc, defaultChanelId) {
    /** Discord Comunication part */
    let client = disc();
    // console.log(socket.handshake.query)

    // Array com as pessoas com os sockets ativos
    /**
     * {
     *  id,
     *  socket
     * }
     */
    let socketArr = [];

    // Array onde vão estar os id's e o respetivo socket das pesoas que já sairam
    let socketArrQuiters = [];

    // Este fica aqui porque é o unico que importa 
    client.on("message", async (msg) => {
        try {
            /** Aqui vai ser onde a minha mensagem é recebida e depois enviada para 
         * o frontend
         */
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

                    console.log(sc.id, sc.roomName, msg.channel.name, sc.socket._rooms/*, sc.roomName, msg.channel.name, msg.content*/)
                    // console.log("---------------------------------------------------------------------------------")
                    if(sc.roomName.split(" ").length > 1) {
                        sc.roomName = sc.roomName.split(" ").join("-")
                    }
                    if (!msg.channel.name.includes('_5f')) {
                        let auxName = msg.channel.name.split("_5f");
                        // console.log("auxName" ,auxName)
                        let newName = "";
                        for (let i=0; i<auxName.length; i++) {
                            if(i == 0) newName = auxName[i] + "_5f";
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


                        console.log("Vai mandar mensaem para o user.", contador, msg.channel.name, sc.socket._rooms);
                        if(sc.socket._rooms.length == 0) {
                            console.log("WITHOUT ROOMS !!!!!!!!!!!!!!!")
                            sc.socket.emit('messageDisc', { msg: msg.content, scId: sc.id });
                        }
                        else {
                            console.log("WITH ROOM !!!!")
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
            // console.log(data)

            /** Vou introduzir os sockets aqui por que é quando tenho a certeza que é "válido" */

        })

        socket.on("mess", async ({ text, token }) => {
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
                let { username, idM } = decoded;
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
                    await socketFromAbove.saveMessage(text, username, channelName)
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
                    // console.log()
                    await socketFromAbove.saveMessage(text, username, channelName)
                    client.channels.cache.get(chanelId).send(text)
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
            socket.broadcast.emit("user left", "A user left")
        })
    })
};