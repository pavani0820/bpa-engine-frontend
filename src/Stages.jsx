import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Checkbox from './Checkbox';
import Radio from './Radio'

const sc = {
    "translateService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "text"
        ],
        "name": "translate",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "formrecLayoutService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "formrecLayout"
        ],
        "name": "formrecLayout",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
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
    const [checked, setChecked] = useState([false,false,false])
    const [optionsChecked, setOptionsChecked] = useState([])
    const [options, setOptions] = useState(null)
    const [done, setDone] = useState(false)
    // const [lastViewInputTypes, setLastViewInputTypes] = useState([])

    const filetypes = ["pdf", "jpg", "wav"]
    

    useEffect(() => {
        const getSC = async () => {
            const result = await axios.get('/api/serviceCatalog')
            setServiceCatalog(result.data)
        }
        getSC()
        // for (let i=0;i<filetypes.length;i++) {
        //     let _checked = false
        //     checked.push(_checked)
        //     setChecked(checked)
        // }
    },[])

    const onDone = (event) => {
        setOptions([])
        setDone(true)
        axios.post('/api/config',{stages: stages, id : "1"})
    }

    const getSelectedFileTypes = () => {
        let ftList = []
        for (let i = 0; i < checked.length; i++) {
            if (checked[i]) {
                ftList.push(filetypes[i])
            }
        }
        return ftList
    }

    const getMatchingOptions = (previousStage) => {
        const _options = []
        for (const k in serviceCatalog) {
            console.log(k)
            for (const acceptedInputType of serviceCatalog[k].inputTypes) {
                if (acceptedInputType === "any") {
                    _options.push(k)
                    break;
                }
                if (previousStage.outputTypes.includes(acceptedInputType.toLowerCase())) {
                    _options.push(k)
                    break;
                }
            }
        }
        return _options
    }

    const getSelectedOptionIndex = () => {
        let index = 0
        for(let i=0;i<optionsChecked.length;i++){
            if(optionsChecked[i]){
                index = i
                break
            }
        }
        return index
    }

    const onNext = (event) => {
        if (stages.length === 0) { //if first stage, set up file types  
            const stage = {
                inputTypes: ["first"],
                outputTypes: getSelectedFileTypes(),
                name : "document type"
            }
            setStages([stage])

            //get the matching outputs from the serviceCatalog 
            const _options = getMatchingOptions(stage)
            setOptions(_options)

            //initialize the checkboxes to false
            optionsChecked.fill(false,0,_options.length-1)
            setOptionsChecked(optionsChecked)

        } else {
            const selectedIndex = getSelectedOptionIndex()

            const newStage = {
                id : "1234",
                name : serviceCatalog[options[selectedIndex]].name,
                inputTypes : serviceCatalog[options[selectedIndex]].inputTypes,
                outputTypes : serviceCatalog[options[selectedIndex]].outputTypes,
            }

            //in the case of 'any', copy the output type of the previous stage
            if(newStage.outputTypes.includes('any')){
                newStage.outputTypes = stages[stages.length-1].outputTypes
            }

            stages.push(newStage)
            setStages(stages)

            //setValue(value + 1) //updating state with arrays doesn't render.  just using this to force a rerender

            const _options = getMatchingOptions(newStage)
            setOptions(_options)

            optionsChecked.fill(false,0,_options.length-1)
            setOptionsChecked(optionsChecked)
            
        }

        setValue(value + 1) //useState on arrays doesn't kick off rerender.  just forcing a rerender.
    }

    
    const onRadioChange = (event) => {
        const index = event.target.id.split('_radio')[0]
        const _checked = [] 
        _checked.fill(false,0,optionsChecked.length-1)
        _checked[Number(index)] = true
        setOptionsChecked(_checked)
        setValue(value + 1) //required because checked doesn't for a rerender
    } 
    const onCheckboxChange = (event) => {
        const index = event.target.id.split('_checkbox')[0]
        checked[Number((index))] = !checked[Number((index))]
        setChecked(checked)
        setValue(value + 1) //required because checked doesn't for a rerender
    }

    const renderFileTypes = () => {
        return (
            filetypes.map((f, index) => {
                return (<Checkbox checked={checked} index={index} filetype={f} onChange={onCheckboxChange} />)
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