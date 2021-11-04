module.exports = {
    "env": {
        "browser": true
        //,"es6": true
    },
    "parserOptions": {
        "ecmaVersion": 8
    },
    "extends": [
        "eslint:recommended",
        "plugin:node/recommended"
    ],
    "rules": {
        "indent": [
            "warn",
            4
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "linebreak-style": [
            "off"
            //"error",
            //"windows"
        ],
        "no-unused-vars": [
            "warn",
            { "varsIgnorePattern": "custom" }
        ],
        "no-inner-declarations": [ "off" ],
        // "node/no-unpublished-require": "false"
    }
}