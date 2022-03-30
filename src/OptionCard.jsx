import { Label } from '@fluentui/react/lib/Label';

export default function OptionCard(props) {

    return (
        <div id={props.option.name + "_optioncard"} onClick={()=>props.onClickHandler(props.option)} style={{ height: "320px", width: "263px", margin: "20px", borderStyle: "solid" }}>
            <img src={props.option.image} alt="top" style={{height:"153px",width:"260px", backgroundColor:"rgb(192,192,192)"}}/>
            <div style={{padding : "10px"}}>
                <Label>{props.option.label}</Label>
            </div>
        </div>
    )
}