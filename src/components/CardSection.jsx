
import React from 'react';
import {CardElement,useStripe} from '@stripe/react-stripe-js';
import '../styles/CardSectionStyles.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  const stripe = useStripe();
  return (
    <div className='mt-3'>
      Card details
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      
    </div>
  );
};

export default CardSection;