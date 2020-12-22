require('dotenv').config({
  path:`.env`,
})
module.exports = {
  plugins: ["gatsby-plugin-typescript"],
  plugins: [
      {
        resolve: 'gatsby-plugin-snipcartv3',
        options: {
          apiKey: process.env.SNIPCART_KEY
        }
      }
    ]
  
};
