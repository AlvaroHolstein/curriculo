const envs = require("../../dev.env");
const jwt = require("jsonwebtoken");
export class AuthClass {
    constructor() {

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
}