class CustomErr extends Error {
    constructor(msg, errObj) {
        super();

        this.msg = msg;
        this.error = errObj;
    }
}

module.exports = CustomErr;