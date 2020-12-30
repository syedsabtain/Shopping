import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {CartProvider} from 'use-shopping-cart'
import {ApolloProvider} from '@apollo/client'
import {client} from '../apollo/client'
import {Helmet} from 'react-helmet'
import {Provider} from 'react-redux'
import {store} from '../React-redux/Storage/ReduxStorage'
const stripePromise = loadStripe('pk_test_51HyDpmDUIQb077dZHkXKIGbq4OaD8EzTxW9amfOvfAdAmaoeyPpDuRoLTe3FogrJmXGuwmv' +
        'V2PuSxaU1AGKOADvi00hdMm2MmF')

export const wrapRootElement = ({element}) => {

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
            <Helmet>
                <title>All Shopping App</title>
            </Helmet>
            <CartProvider
                mode="client-only"
                stripe={stripePromise}
                successUrl="https://stripe-snipcart-syedsabtain.netlify.app/Snipcart"
                cancelUrl="https://stripe-snipcart-syedsabtain.netlify.app/Stripe"
                currency="USD"
                allowedCountries={['US', 'GB', 'CA']}
                billingAddressCollection={true}>
                {element}
            </CartProvider>
            </Provider>
        </ApolloProvider>
    )
}