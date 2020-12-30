require('dotenv').config({
  path:`.env`,
})
module.exports = {
  plugins: ["gatsby-plugin-typescript"],
  plugins: [`gatsby-plugin-react-helmet`],
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
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `GatsbyJS`,
          short_name: `GatsbyJS`,
          start_url: `/`,
          background_color: `#f7f0eb`,
          theme_color: `#a2466c`,
          display: `standalone`,
          icon: `src/images/favico.png`,
        },
      },
    ]
  
};
