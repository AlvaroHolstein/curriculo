const path = require("path");
const Dotenv = require('dotenv-webpack');
module.exports = {
    module: {
      rules: [
        // ... other rules omitted
  
        // this will apply to both plain `.scss` files
        // AND `<style lang="scss">` blocks in `.vue` files
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader',
          ]
        }
      ]
    },
    plugins: [
      new Dotenv({ systemvars: true })
    ],
    // plugin omitted
  }