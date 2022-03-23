export default function Checkbox(props) {

    return (
        <div >
            <label>
                <input id={props.index+"_checkbox"}
                    type="checkbox"
                    checked={props.checked[Number(props.index)]}
                    onChange={props.onChange} />
                {props.filetype}
            </label>
        </div>
    )

}