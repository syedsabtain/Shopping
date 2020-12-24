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
      },
      {
        resolve: `gatsby-source-shopify`,
        options: {
          // The domain name of your Shopify shop.
          shopName: process.env.SHOPIFY_NAME,
          // The storefront access token
          accessToken: process.env.SHOPIFY_ACCESSTOKEN,
        },
      }
    ]
  
};
