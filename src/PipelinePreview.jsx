import OptionCard from "./OptionCard"
import arrow from "./images/arrow.png"

export default function PipelinePreview(props) {
    if (props.stages && props.stages.length > 0) {
        return (
            <div style={{ display: "flex", padding: "30px" }} >
                {props.stages.map((option, index) => {
                    console.log(`index : ${index}`)
                    if (index === props.stages.length - 1) {
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
    } else {
        return (<>
            <div style={{paddingTop : "360px"}}></div>
        </>)
    }
}