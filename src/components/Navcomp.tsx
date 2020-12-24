import React from 'react'
import {Link} from 'gatsby'

const Navcomp =()=>{

    return(
        <ul className="nav d-flex justify-content-center">
  <li className="nav-item">
    <Link className="nav-link active" aria-current="page" to='/Stripe'>Stripe</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to='/Snipcart'>SnipCart</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to='/OpenSource'>OpenSource</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to='/Shopify'>Shopify</Link>
  </li>

</ul>

    )
}

export default Navcomp