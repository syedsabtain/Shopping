import React from 'react'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm2 from '../components/CheckOutForm2'
import Maincomp from '../templates/Maintemp'

const stripePromise = loadStripe("pk_test_51HyDpmDUIQb077dZHkXKIGbq4OaD8EzTxW9amfOvfAdAmaoeyPpDuRoLTe3FogrJmXGuwmvV2PuSxaU1AGKOADvi00hdMm2MmF");
const Checkout =()=>

{
    return(
      <Maincomp>
<div className='container'>
<Elements stripe={stripePromise}>
    <CheckOutForm2></CheckOutForm2>
  </Elements>
</div>
</Maincomp>
        
    )
}


export default Checkout