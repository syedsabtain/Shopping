import React, { useState } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  let[details,setDetails] = useState({
    firtname:'',
    lastName:'',
    email:'',
    address:'',
    phone:''
  })
  const handleDetails=(e,nm)=>{

    switch (nm) {
      case 1:
            setDetails({
              firtname:e.target.value,
              lastName:details.lastName,
              email:details.email,
              address:details.address,
              phone:details.phone
            })
        break;
        case 2:
          setDetails({
            firtname:details.firtname,
            lastName:e.target.value,
            email:details.email,
            address:details.address,
            phone:details.phone
          })
      break;
      case 3:
        setDetails({
          firtname:details.firtname,
          lastName:details.lastName,
          email:e.target.value,
          address:details.address,
          phone:details.phone
        })
    break;
    case 4:
      setDetails({
        firtname:details.firtname,
        lastName:details.lastName,
        email:details.email,
        address:e.target.value,
        phone:details.phone
      })
  break;
  case 5:
    setDetails({
      firtname:details.firtname,
      lastName:details.lastName,
      email:details.email,
      address:details.address,
      phone:e.target.value,
    })
break;
    
      default:
        break;
    }
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const secretkey = await fetch('/.netlify/functions/Payment');
    // console.log(secretkey)
    const res =    await  secretkey.json();
    
    const result = await stripe.confirmCardPayment(res.CLIENT_SECRET, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: details.firtname.concat(" "+details.lastName),
          address: details.address,
          phone:details.phone,
          email:details.email
          
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result?.paymentIntent.status === 'succeeded') {
        alert('payment succedded')
      }
    }
  };

  return (
    
      <div className='container'>
        <form className="row g-3 needs-validation"  onSubmit={handleSubmit}>
  <div className="col-md-4">
    <label htmlFor="validationCustom01" className="form-label">First name</label>
    <input type="text" className="form-control" id="validationCustom01"  placeholder='FirtName' required  onChange={(e)=>{handleDetails(e,1)}}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Last name</label>
    <input type="text" className="form-control" id="validationCustom02"  placeholder='LastName' required  onChange={(e)=>{handleDetails(e,2)}}/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-4">
  
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required  onChange={(e)=>{handleDetails(e,3)}}/>

  </div>
  <div className="col-md-6 mt-3">
    <label htmlFor="validationCustom03" className="form-label">Address</label>
    <input type="text" className="form-control" id="validationCustom03" required  onChange={(e)=>{handleDetails(e,4)}}/>
    <div className="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
 
  <div className="col-md-3 mt-3">
    <label htmlFor="validationCustom05" className="form-label">Phone Number</label>
    <input type="text" className="form-control" id="validationCustom05" required  onChange={(e)=>{handleDetails(e,5)}}/>
    <div className="invalid-feedback">
      Please provide a valid Phone Number.
    </div>
  </div>
  
  
  <div className="col-12">
  <CardSection />
  <div className="col-12 mt-3">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck" required />
      <label className="form-check-label" htmlFor="invalidCheck">
        Agree to terms and conditions
      </label>
      <div className="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
      <br/>
      <button disabled={!stripe} className='btn btn-outline-info mt-2' type='submit'>Confirm order</button>
  </div>

      
    </form>
  
      </div>
  );
}