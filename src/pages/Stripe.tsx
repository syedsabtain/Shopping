import  React from "react"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Maintemp from "../templates/Maintemp";

const stripePromise = loadStripe("pk_test_51HyDpmDUIQb077dZHkXKIGbq4OaD8EzTxW9amfOvfAdAmaoeyPpDuRoLTe3FogrJmXGuwmvV2PuSxaU1AGKOADvi00hdMm2MmF");
export default()=>{
  
  return(
    <Maintemp>
      <div className='container mt-5 '>
      <div className='row '>
        <div className='col-md-12'>
          <p></p>
           <h1 className='mt-4 mb-5'>Stripe CheckOut Form</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
    </Maintemp>
  )
}

