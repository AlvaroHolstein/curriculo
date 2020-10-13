const router = require("express").Router();
const messageController = require("../controller/message.controller");
const bodyParser = require("body-parser");


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
 */



/** Isto vai ficar aqui, mas as comunicações com o 
 * frontend vão ficar no socket file.
 */
router.get("/:compId", async (req, res, next) => {
    try {
        let response = await messageController.getMessages(req.params.compId)

        console.log(response);
        res.json({ success: true, data: response});
    } catch (err) {
        next(err)
    }
});

/** Vou ter que receber mensagem do frontend */
router.post("")

/** Vou ter que mandar uma mensagem do discord para o frontend */
router.post("")


module.exports = router;
