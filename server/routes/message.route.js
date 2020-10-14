const router = require("express").Router();
const jwt = require("jsonwebtoken");

const messageController = require("../controller/message.controller");
// const messageController = require("../controller/message.controller");

/**
 * 
 * @param {ChatMessage} chatMessage 
 */
function MessageConstructor(chatMessage) {
    /**
     * Notas Importantes: 
     *  As mensagens que forem trocadas com utilizadores nao autenticados vão 
     * ser gravadas na session storage... Guardar estas na BD, penso que sinhe.
     * 
     *  AS outras mensagens vão ter que ter um id associado à pessoa que está a 
     * falar.
     *  Nome *
     *  Empresa
     *  Data - Vai ser por aqui que as mensagens vão ser ordenadas,
     * e para as mensagens ficarem mesmo bem ordenadas a data e HORA só devia 
     * ser inserida ao chegar ao servidor, e se for preciso reordenada 
     * no frontend, vou ter que implementar um lazy loading nas mensagens,
     * FORMATO DA DATA NO MONGO -> 2020-08-30T23:00:00.000+00:00
     *  Self * 
     *  Message - Texto da mensagem
     * * = Obrigatório
     * 
     * Não é que consegui ter o discord Inicializado e em forma de classe
     * pronta para fazer as cenas que eu quiser tanto no discord (como no socket, hmmmmmm -_- ?)
     * lele
     */


    /** 
     * Como mando o username + idM nos parametros de forma segura
     * 
     * A certa altura vou ter em basicamente todo o lado uma função que faz navigation guard
     * e que vai verificar o token por isso ...
     */
    router.post("/getmessages", async (req, res, next) => {
        try {
            /** Mando estes dois parametros e faço a magia no controller
             * Acho que vou ter que mandar o token se quero fazer isto assim
             * 
             * por agora vai ter que vir no body do pedido,
             * mas depois em prod vai ter que vir nas cookies, NAO ESQUECER
             */

            let {username, idM} = await jwt.verify(req.body.token, process.env.JWT_SECRET);
            let chName = (username+idM).toLowerCase();
            console.log("chname", chName);

            let response = await messageController.getMessages(chName);
            
            res.json({ success: true, data: response });
        } catch (err) {
            console.log('ERRO!!!!!!!!!!!!!!!!!!!!!!!!!', err)
            next(err)
        }
    });

    return router;
}


module.exports = MessageConstructor;
