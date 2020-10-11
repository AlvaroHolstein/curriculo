const path = require("path");
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.dev.env.js')
})

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
      new webpack.DefinePlugin( {
        "process.env": dotenv.parsed
      } ),
    ],
    // plugin omitted
  }