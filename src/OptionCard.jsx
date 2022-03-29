export default function OptionCard(props) {

    return (
        <div id={props.option.name + "_optioncard"} onClick={()=>props.onClickHandler(props.option)} style={{ height: "320px", width: "263px", margin: "20px", borderStyle: "solid" }}>
            <img src={props.option.image} alt="top"/>
            <div style={{padding : "10px"}}>
                {props.option.label}
            </div>
        </div>
    )
}