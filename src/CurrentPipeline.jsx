import axios from "axios"
import { useEffect, useState } from "react"
import PipelinePreview from './PipelinePreview'


export default function Stages() {

    const [stages, setStages] = useState([])

    useEffect(() => {
        try {
            axios.get('/api/config').then(value => setStages(value.data.stages))
        } catch (err) {
            console.log(err)
        }

    }, [])


    return (
        <div style={{ overflow: "auto" }}>
            <PipelinePreview stages={stages} />
        </div>
    )
}