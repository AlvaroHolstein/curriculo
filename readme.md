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