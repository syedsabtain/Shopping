import React from 'react'
import Navcomp from './Navcomp'

export const  WrapRootElement =(elements)=>{

    return(
        <div className='container mt-5'>
                <Navcomp></Navcomp>
                {elements}
        </div>
    )
}