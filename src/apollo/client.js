import fetch from 'cross-fetch'
import {ApolloClient,InMemoryCache, HttpLink} from '@apollo/client'

export const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://sabtainteststore.myshopify.com/api/graphql',
        fetch,
        headers:{
            "X-Shopify-Storefront-Access-Token":"566aa075c17384eb6a6139388f670e1f"
        }
    }),
    cache: new InMemoryCache()
})