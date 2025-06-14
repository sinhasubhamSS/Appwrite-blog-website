// // how we protect pages and routes
// import React from 'react'
// import { useEffect,useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// export default function Protected({children,authenticaton=true
// })
// {
//     const navigate = useNavigate()
//     const[loader,setLoader]=useState(true)
//     const authStatus=useSelector(state=>state.auth.status)

//     useEffect(()=>{
//         if(authenticaton && authStatus!==authenticaton){
//             navigate("/login")
//         }
//         else if(!authenticaton && authStatus !==authenticaton){
//             navigate("/")
//         }
//         setLoader(false)
//     },[authStatus,navigate,authenticaton])

//   return (
//     <div>AuthLayout</div>
//   )
// }








import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

