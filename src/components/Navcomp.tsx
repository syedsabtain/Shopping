import React from 'react'
import {Link} from 'gatsby'
import {useLocation} from '@reach/router'

const Navcomp =()=>{

  const location = useLocation();
  
    return(
        <ul className="nav d-flex justify-content-center">
           <li className="nav-item">
    <Link className={location.pathname === '/' ? "nav-link navdactive " : "nav-link "} aria-current="page" to='/'>HOME</Link>
  </li>
  <li className="nav-item">
    <Link className={location.pathname === '/Stripe' ? "nav-link navdactive " : "nav-link "} aria-current="page" to='/Stripe'>Stripe</Link>
  </li>
  <li className="nav-item">
    <Link className={location.pathname === '/Snipcart' ? "nav-link navdactive" :"nav-link "} to='/Snipcart'>SnipCart</Link>
  </li>
  <li className="nav-item">
    <Link className={location.pathname === '/OpenSource' ? "nav-link navdactive" : "nav-link"} to='/OpenSource'>OpenSource</Link>
  </li>
  <li className="nav-item">
    <Link className={location.pathname === '/Shopify' ? "nav-link navdactive" :"nav-link"} to='/Shopify'>Shopify</Link>
  </li>
  <li className="nav-item">
    <Link className={location.pathname === '/ShopifyGraphlql' ? "nav-link navdactive": "nav-link"} to='/ShopifyGraphlql'>Shopify Using Graphql</Link>
  </li>

</ul>

    )
}

export default Navcomp