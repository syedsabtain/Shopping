import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'




const stripePromise = loadStripe('pk_test_51HyDpmDUIQb077dZHkXKIGbq4OaD8EzTxW9amfOvfAdAmaoeyPpDuRoLTe3FogrJmXGuwmvV2PuSxaU1AGKOADvi00hdMm2MmF')

export const  wrapRootElement =({element})=>{

    return(
        <CartProvider
        mode="client-only"
        stripe={stripePromise}
        successUrl="https://stripe-snipcart-syedsabtain.netlify.app/Snipcart"
        cancelUrl="https://stripe-snipcart-syedsabtain.netlify.app/Stripe"
        currency="USD"
        allowedCountries={['US', 'GB', 'CA']}
        billingAddressCollection={true}
      >
       {element}
      </CartProvider>
    )
}