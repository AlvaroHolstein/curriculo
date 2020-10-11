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
```

# 11/10
[Headers in express](https://stackoverflow.com/questions/43002444/make-axios-send-cookies-in-its-requests-automatically)

tive que instalar o ```npm install --save aws-sdk```.... Deve ter sido por causa do jsonwebtoken, que isto só apareceu depois de usar verify()