const path = require('path')

exports.onCreatePage = async ({page,actions})=>{

  const {createPage} = actions

  if(page.path.match(/^\/MainProducts/)){
      page.matchPath = "/MainProducts/*"
      createPage(page)
  }
}
exports.createPages = async({graphql,actions})=>{

    const{createPage} = actions
    const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        edges {
          node {
            title
            images {
              originalSrc
            }
            shopifyId
            handle
            description
            availableForSale
            priceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `)

  result.data.allShopifyProduct.edges.forEach(({node})=>{
      createPage({
          path:`/Shopify/${node.handle}`,
          component:path.resolve(`./src/templates/Products.tsx`),
          context:{
              product:node,
          }
      })
  })

}