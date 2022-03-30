import OptionCard from "./OptionCard"

export default function PipelinePreview(props) {
    if (props.stages) {
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