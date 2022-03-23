export default function Checkbox(props) {

    return (
        <div >
            <label>
                <input id={props.index+"_radio"}
                    type="radio"
                    checked={props.checked}
                    onChange={props.onChange} />
                {props.option}
            </label>
        </div>
    )

}