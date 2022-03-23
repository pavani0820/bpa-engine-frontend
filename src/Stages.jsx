import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Checkbox from './Checkbox';
import Radio from './Radio'

const sc = {
    "ocrService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf",
            "jpg"
        ],
        "outputTypes": [
            "text"
        ],
        "name": "ocr",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "viewService": {
        "inputTypes": [
            "any"
        ],
        "outputTypes": [
            "any"
        ],
        "name": "view",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "summarizeService": {
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "text"
        ],
        "name": "summarize",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "languageNerService": {
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "languageNer"
        ],
        "name": "languageNer",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "sttService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "wav",
            "mp3"
        ],
        "outputTypes": [
            "text"
        ],
        "name": "stt",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    }
}


export default function Stages() {

    const [serviceCatalog, setServiceCatalog] = useState(sc)
    const [stages, setStages] = useState([])
    const [value, setValue] = useState(0)
    const [checked, setChecked] = useState([])
    const [optionsChecked, setOptionsChecked] = useState([])
    const [options, setOptions] = useState(null)
    const [done, setDone] = useState(false)
    // const [lastViewInputTypes, setLastViewInputTypes] = useState([])

    useEffect(() => {
        const getSC = async () => {
            const result = await axios.get('/api/serviceCatalog')
            setServiceCatalog(result.data)
            console.log(serviceCatalog)
        }
        getSC()
        for (let i=0;i<filetypes.length;i++) {
            let _checked = false
            checked.push(_checked)
            setChecked(checked)
            // const onChange = () => {console.log(`handler for ${f}`)}
            // checkboxes.push(<Checkbox checked={checked[index]} index={index} filetype={f} onChange={onChange}/>)
            // setCheckboxes(checkboxes)
        }
    },[])

    const onDone = (event) => {
        setOptions([])
        setDone(true)
        axios.post('/api/config',stages)
    }

    const onNext = (event) => {
        if (stages.length === 0) {
            let ftList = []
            for (let i = 0; i < checked.length; i++) {
                if (checked[i]) {
                    ftList.push(filetypes[i])
                }
            }
            const stage = {
                inputTypes: ["first"],
                outputTypes: ftList,
                name : "document type"
            }
            setStages([stage])

            const _options = []
            for (const k in sc) {
                console.log(k)
                for (const acceptedInputType of sc[k].inputTypes) {
                    if (acceptedInputType === "any") {
                        //setLastViewInputTypes(sc[k].inputTypes)
                        _options.push(k)
                        break;
                    }
                    console.log(stage.outputTypes)
                    if (stage.outputTypes.includes(acceptedInputType.toLowerCase())) {
                        console.log(acceptedInputType)

                        _options.push(k)
                        break;
                    }
                }

            }
            setOptions(_options)
            for(let i=0;i<_options.length;i++){
                optionsChecked.push(false)
                setOptionsChecked(optionsChecked)
            }

        } else {
            let index = 0
            for(let i=0;i<optionsChecked.length;i++){
                if(optionsChecked[i]){
                    index = i
                    break
                }
            }

            const newStage = {
                name : sc[options[index]].name,
                inputTypes : sc[options[index]].inputTypes,
                outputTypes : sc[options[index]].outputTypes,
            }

            if(newStage.outputTypes.includes('any')){
                newStage.outputTypes = stages[stages.length-1].outputTypes
            }

            stages.push(newStage)
            setStages(stages)
            setValue(value + 1)
            console.log(newStage)

            const _options = []
            for (const k in sc) {
                console.log(k)
                for (const acceptedInputType of sc[k].inputTypes) {
                    if (acceptedInputType === "any") {
                        _options.push(k)
                        break;
                    }
                    
                    if (newStage.outputTypes.includes(acceptedInputType.toLowerCase())) {
                        console.log(acceptedInputType)

                        _options.push(k)
                        break;
                    }
                }

            }
            setOptions(_options)
            let _optionsChecked = []
            for(let i=0;i<_options.length;i++){
                _optionsChecked.push(false)
            }
            setOptionsChecked(_optionsChecked)
            
        }

        setValue(value + 1)
    }

    const filetypes = ["pdf", "jpg", "wav"]
    const onRadioChange = (event) => {
        console.log(event)
        console.log(`handler for options`)
        console.log(`id : ${event.target.id}`)
        const index = event.target.id.split('_radio')[0]
        console.log(`index : ${index}`)
        const _checked = [] 
        for(let i=0;i<optionsChecked.length;i++){
            _checked.push(false)
        }
        _checked[Number(index)] = true
        
        setOptionsChecked(_checked)
        setValue(value + 1) //required because checked doesn't for a rerender
    } 
    const onChange = (event) => {
        console.log(`handler for ....`)
        console.log(`id : ${event.target.id}`)
        const index = event.target.id.split('_checkbox')[0]
        console.log(`index : ${index}`)
        checked[Number((index))] = !checked[Number((index))]
        setChecked(checked)
        setValue(value + 1) //required because checked doesn't for a rerender
    }
    const renderFileTypes = () => {
        return (
            filetypes.map((f, index) => {
                return (<Checkbox checked={checked} index={index} filetype={f} onChange={onChange} />)
            })
        )
    }

    const renderOptions = (options) => {
        if (options) {
            return (
                options.map((option, index) => {
                    return (<Radio checked={optionsChecked[index]} index={index} option={option} />)
                })
            )
        } else{
            return(<></>)
        }

    }

    const renderStage = () => {
        if(done){
            return (<>{JSON.stringify(stages)}</>)
        }
        if (stages.length === 0) {
            return (<>
                <div style={{ display: "flex" }}>
                    <div style={{ flexDirection: "column" }}>

                        {renderFileTypes()}
                        <Button variant="primary" onClick={onNext}>Next</Button>{' '}
                        <Button variant="primary">Done</Button>{' '}
                    </div>
                </div>

            </>)
        } else {

            return (<>
                <div style={{ display: "flex" }}>
                    <div style={{ flexDirection: "column" }}>
                        <div onChange={onRadioChange}>
                            {renderOptions(options)}
                        </div>
                        <Button variant="primary" onClick={onNext}>Next</Button>{' '}
                        <Button variant="primary" onClick={onDone}>Done</Button>{' '}
                    </div>
                </div>

            </>)
        }
    }

    return (<>
        {renderStage()}
    </>)


}