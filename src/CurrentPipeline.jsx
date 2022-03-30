import axios from "axios"
import { useEffect, useState } from "react"
import OptionCard from "./OptionCard"
import arrow from './images/arrow.png'


export default function Stages() {

    const [stages, setStages] = useState()

    useEffect(() => {
        try {
            axios.get('/api/config').then(value => setStages(value.stages))
        } catch (err) {
            console.log(err)
        }

    }, [])


    const renderPipeline = () => {
        if (stages) {
            return (
                <div style={{ display: "flex", padding: "30px" }} >
                    {stages.map((option, index) => {
                        console.log(`index : ${index}`)
                        if (index === stages.length - 1) {
                            return (
                                <>
                                    <OptionCard option={option} />
                                </>)
                        } else {
                            return (
                                <>
                                    <OptionCard option={option} />
                                    <img src={arrow} alt="progress indicator" />
                                </>)
                        }
                    })}
                </div>
            )
        }
    }



    if (stages) {
        return (
            <div style={{ display: "flex" }}>
                <div style={{ flexDirection: "column" }}>
                    {renderPipeline()}
                </div>
            </div>
        )

    } else {
        return (
            <div style={{ display: "flex" }}>
                <div style={{ flexDirection: "column" }}>
                    <>No Pipeline Configured</>
                </div>
            </div>
        )
    }


}