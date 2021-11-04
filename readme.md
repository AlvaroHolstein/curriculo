Fazer com que os detalhes estejam protegidos.

Fazer uma integração com o discord.

## Bibliografia
[Unstage files](https://devconnected.com/how-to-unstage-files-on-git/)
[Negate certain files in gitignore](https://linuxize.com/post/gitignore-ignoring-files-in-git/#negating-patterns)

# 02/10

- Vou ter que diferenciar quando sou eu a responder e quando é o utilizador, apesar de que eu vou sempre falar pelo discord....

# 10/10

- [Importante Mongoose](https://mongoosejs.com/docs/api.html#schema_Schema-post)

Porque caralhos não funcionou .....
```
exists({email, username}) {
        return new Promise((resolve, reject) => {
            /** Fazer um promise all */
            console.log({email, username})
            let founded = {
                username: false,
                email: false,
                finishedUsername: false,
                finishedEmail: false,
            };

            function finishEmail() {
                founded.finishedEmail = true
            }
            function finishUs() {
                founded.finishedUsername = true
            }

            let started = {
                us: false,
                email: false
            }

            let count = 0;
            do {

                if (email != "" && started.email == false) {
                    console.log("Comecei a procurar por email!!!")

                    /* Vou ter que fazer um caso para o caso de nºao vir email ou username */
                    started.email = true; // Para só fazer esta pesquisa só uma vez

                    user.find({ email: email }, (err, data) => {
                        if (err) {
                            /** Quando há erro em qualquer uma saisse da função e pronto */
                            reject({ err: error, success: false });
                            finishEmail()
                            return;
                        }

                        founded.email = data.length == 0 ? false : true;
                        finishEmail()
                    })
                } else if (email == "") {
                    finishEmail()
                }

                


                if (username != "" && started.us == false) {
                    console.log("Comecei a procurar por username!!!")

                    started.us = true;

                    user.find({ username: username }, (err, data) => {
                        if (err) {
                            reject({ err: error, success: false });
                            finishUs()
                            return;
                        }

                        founded.username = data.length == 0 ? false : true;
                        finishUs()
                    })
                } else if (username == "") {
                    finishUs()
                }

                count++
                console.log(count, username, founded)
            } while(founded.finishedEmail == false || founded.finishedUsername == false);

            resolve(founded);
            return;
        })
    }
}
```

# 11/10
[Headers in express](https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically)

tive que instalar o ```npm install --save aws-sdk```.... Deve ter sido por causa do jsonwebtoken, que isto só apareceu depois de usar verify()

# 13/10

Estava no socket.js em socket.on("mess", ......
```
/** Neste forEach há 3 paramnetros 
    * Onde:
    * parametro 1 channel
    * parametro 2 id do canal
    * paramentro 3, ainda mistério,
    * 
*/
client.channels.cache.forEach((ch, index, i) => {
    // console.log(`Channel - ${index}`, ch.id, ch.createdAt, i)
    // console.log(ch.type)
    if(ch.type == "text" && ch.guild.name == "ServidorBot") {
        // console.log(ch.client)
    }
})
```

Erro que é preciso melhorar o seu error handling
O Importante é  a parte que diz que no futuro os erros não lidados corretamente vao terminar o processo NODEJS
```
(node:16200) UnhandledPromiseRejectionWarning: TypeError [INVALID_TYPE]: Supplied parameter is not a User nor a Role.
    at Function.resolve (D:\alvaro\Documents\code\curriculo\node_modules\discord.js\src\structures\PermissionOverwrites.js:177:28)
    at permissionOverwrites.map.o (D:\alvaro\Documents\code\curriculo\node_modules\discord.js\src\managers\GuildChannelManager.js:109:81)
    at Array.map (<anonymous>)
    at GuildChannelManager.create (D:\alvaro\Documents\code\curriculo\node_modules\discord.js\src\managers\GuildChannelManager.js:109:51)
    at Socket.socket.on (D:\alvaro\Documents\code\curriculo\server\socket.js:77:36)
    at process._tickCallback (internal/process/next_tick.js:68:7)
(node:16200) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a
promise which was not handled with .catch(). (rejection id: 2)
(node:16200) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

### Meesage Array "template"
```
{ message: "ola", date: "2020/08/31", self: false },
{
    message:
    "asdlklaksjdoaijsldknalksndlaknlaksndlkknalsdknaoilknalksnls lkmalskdm",
    date: "2020/08/31",
    self: true,
},
{ message: "ola", date: "2020/08/31", self: true },
{ message: "ola", date: "2020/08/31", self: true },
{ message: "ola", date: "2020/08/31", self: true },
{
    message:
    "asdlklaksjdoaijsldknalksndlaknlaksndlkknalsdknaoilknalksnls lkmalskdm",
    date: "2020/08/31",
    self: true,
},
{ message: "ola", date: "2020/08/31", self: true },
{
    message:
    "asdlklaksjdoaijsldknalksndlaknlaksndlkknalsdknaoilknalksnls lkmalskdm",
    date: "2020/08/31",
    self: false,
},
{ message: "ola", date: "2020/08/31", self: true },
```

# 21/10

[Só porque sinhe JSON parser for circular objects](https://www.npmjs.com/package/json-prune)
[Discord CheatSheet](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584)
[Ajudou a decidir e a criar os rooms para o socket io](https://stackoverflow.com/questions/13143945/dynamic-namespaces-socket-io)

# 31/01/2021
- Na página de detalhes podia fazer um resumo dos commits para os meus repositórios, usando também um graph
- E para ser ganda maluco, devia deixar as pessoas criar webhooks.
    * Mas estas duas cenas só para users autenticados
- Tenho que fazer a diferencação entre users que têm conta e os que não têm conta, ou seja, vou ter que deixar 
os utilizadores verem o curriculo sem terem que fazer login e depois só permitir o acesso a certas páginas aos 
utilizadores com conta.

# 07/02
- Vou tentar fazer esta parte da informação do github como uma função serverless,
porque assim depois vou poder utilizar a informação que vai ser ai gerada em mais que um projeto 🎉

- Que librarias e que vou usar:
    * [Github.js](https://github-tools.github.io/github/) (Para ir buscar a informação sobre o meu Github)
    * [VueJs 3](https://v3.vuejs.org/guide/migration/introduction.html) (Vou querer fazer a migração do Vue 2 para o Vue 3), o _Vue Router_ e _Vuex_ já estão na versão 3 
    o Vue é que está na versão 2.6.
    * [Bilboard.js](https://github.com/naver/billboard.js) (Tem como dependencia direta o [D3.js](https://github.com/d3/d3/wiki),
    mas parece ser um wrapper fixe para descomplicar esta libraria que faz mais do que eu quero para este caso.)

    * Para o _Host_ da __Serverless Function__ vou usar a amazon porque é o Host com que estou mais familiarizado.
    
# 18/06

# 20/06
- Acho que depois de criar um novo canal vou ter que ir ao user alterar lhe o 
campo `channelId`, porque não dá para usar apenas o nome mais um identificador 
unico no nome do canal, pelo menos da maneira com eu estou a fazer.
    - Não esquecer de corrigir os erros provocados por estas ultimas alterações.
- __Não Esquecer__ de meter uma foto em algum lado a mostrar que as passwords estão completamente encriptadas...
    - já não me lembro se consigo ver las facilmente porque tenho o segredo/keyword para as "desvendar" ou se fiz
    mais alguma merda para não ser possivel que eu as veja... (não me cheira).

- Vou ter que mudar então a forma de fazer login para ser possivel entrar como Guest... O que faz com que tenha que alterar
a lógica das mensagens, já ia ter que fazer isso.
- Por o site a funcionar outra vez, já tinha metido para aqui o print do erro. Ir ao outro PC e fazer push seu dumb ass.

# 06/09
- Devo ter que fazer sync deste ficheiro porque tenho quase a certeza que já escrevi para aqui merdas noutros 
dias mas não cheguei a dar push...

- A função `socket.js > saveMessages()` leva um username...
    - Qual vai ser o username do Guest?

- Criar branch para fazer os Guests, de maneira a ter o master pronto para release?


- _Bug🐛:_ Em produção trocar mensagens com o utilizador _diogo_ fez com que 
multiplos canais no discord fossem criados para o mesmo utilizador...
    - Pensei que isto já estivesse corrigido.
    - _Update:_ Bug descoberto, o nome do canal criado não pode ser dividido pelo `"_5f"` pois este no meio do nome tem um `"_60"` vou precisar de encontrar 
    __algo que diferencie unicamente o canal__. 

- Ainda não consegui fazer o correto logout por tempo a mais no frontend
    - Pelo menos em produção.


# 04/11
- Mudar as mensagens de aviso enviadas para o discord quando um utilizador entra
    - Distinguir entre DEV e PROD

-  Começar a fazer com que não seja preciso fazer login à entrada
    - 1º vou fazer com que no frontend isto funcione direito
        - Mudar o isGuest na store sempre que:
            - logout
            - login
            - falha de autenticação a navegar entre páginas

            - Acho que já consegui fazer a parte do Frontend mais ou menos como deve de ser,
            pelo menos o username parece estar a mudar como deve de ser depois de o __Logout__ e do __Login__
        
    - 2º preocupo me em saber como é que vou fazer com que as mensagens com os "guests" funcionam direito.
        - Depois de ter feito a parte da ultima alinea do (_1º ponto_) posso então passar a ver como 
        é que vou __Corrigir o problema dos Logins que está a acontecer em produção__ e fazer também 
        a parte de deixar os Guests mandar mensagem.
        
- Notas:
    - [Quando estão a aparecer umas mensagesn estranhas no DEBUG Mode do VS Code](https://github.com/vsDizzy/bug-vscode-js-debug/blob/master/.vscode/launch.json)

