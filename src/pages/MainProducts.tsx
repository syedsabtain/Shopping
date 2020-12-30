import React,{useEffect} from 'react'
import {Router} from '@reach/router'
import Viewimage from '../components/comp/Viewimage'
import mugstore from '../components/Store/MugStore'


export default()=>{
    
    const loading = false
    
    return(
      <>
                <Router basepath='/MainProducts' >
                    {Object
                    .entries(mugstore).map(([
                        slug, {
                            name,
                            img,
                            price,
                            id,
                            count
                        },
                        
                    ])=>{
                        // console.log('firstdata',name.replace(/\s/g, ''))
                        return(<Viewimage key={slug} pageContext={{data:slug}} path={`/${name.replace(/\s/g, '')}`}></Viewimage>)
                    })}
                </Router>
           
        </>
    )
}