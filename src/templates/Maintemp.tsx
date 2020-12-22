import React from 'react'
import Navcomp from '../components/Navcomp'
export default({children})=>{

    return(
            <div className='container mt-5'>
                <Navcomp></Navcomp>
                {children}
            </div>
    )
}