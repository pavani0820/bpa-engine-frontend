import { useEffect, useState } from "react"

export default function Stages() {

    const [stages] = useState(null)

    useEffect(()=> {

    },[])


    if(stages){

    } else {
        return(
            <>No Pipeline Configured</>
        )
    }


}