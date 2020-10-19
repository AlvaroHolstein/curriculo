const envs = require("../../dev.env");
const jwt = require("jsonwebtoken");
export class AuthClass {
    constructor() {
        this.lsToken = 'elto';      
    }

    static verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(decoded);
                return;
            })
        })
    }

    /**
     * 
     * @param {axios} http 
     * @param {url} url
     * @param {string} token 
     */
    static logout(http, url, token) {
        return new Promise((res, rej) => {
            console.log(token, this.lsToken);
            http.post(`${url}auth/logout`, { token: token })
                .then(killToken => {
                    console.log(killToken)
                    if(killToken.data.success) {

                        if(localStorage.getItem('elto')) {
                            localStorage.setItem('elto', "");
                        }

                        res(true);
                    }
                }).catch(error => {
                    rej(error)
                })
        })
    }
}