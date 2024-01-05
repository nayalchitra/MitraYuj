import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Routing() {

    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("name"));
    console.log([...searchParams.entries()]);

    useEffect(()=>{
        setSearchParams({
            search:'chitra'
        })
    },[])
  return (
    <div>
      Routing
    </div>
  )
}
