import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PipelinePreview from './PipelinePreview'
import OptionCard from './OptionCard';
import _ from 'lodash'

import { sc } from './serviceCatalog'
import { Label } from '@fluentui/react/lib/Label';
import { Button, Dialog, Dropdown } from '@fluentui/react-northstar'

const dropdownStyles = {
    dropdown: { width: 300 },
    marginTop: "20px"
};

const languages = [
    { key: 'en', text: 'English' },
    { key: 'es', text: 'Spanish' },
    { key: 'th', text: 'Thai' },
    { key: 'fr', text: 'French' },
];

const languagesText = [
    'English', 'Spanish', 'Thai', 'French'
]

export default function Stages(props) {

    const [serviceCatalog] = useState(sc)
    const [stages, setStages] = useState([])
    const [value, setValue] = useState(0)
    const [options, setOptions] = useState([])
    const [hideTranslateDialog, setHideTranslateDialog] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    const [currentOption, setCurrentOption] = useState(null)


    useEffect(() => {
        const getSC = async () => {
            const matchingOptions = getMatchingOptions({
                outputTypes: ["start"]
            })
            setOptions(matchingOptions)

            // const result = await axios.get('/api/serviceCatalog')
            // setServiceCatalog(result.data)
        }
        getSC()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDone = async () => {
        try{
            await axios.post('/api/config', { stages: stages.slice(1, stages.length), id: "1" })  
        } catch(err) {
            console.log(err)
        }

        props.onSelectContent({currentTarget : {id : "CURRENT_PIPELINE"}})
        setOptions([])
    }

    const getMatchingOptions = (previousStage, allowAny) => {
        const _options = []
        for (const k in serviceCatalog) {
            for (const acceptedInputType of serviceCatalog[k].inputTypes) {
                if (acceptedInputType === "any" && allowAny) {
                    _options.push(serviceCatalog[k])
                    break;
                }
                if (previousStage.outputTypes.includes(acceptedInputType.toLowerCase())) {
                    _options.push(serviceCatalog[k])
                    break;
                }
            }
        }
        return _options
    }

    const onResetPipeline = () => {
        setStages([])
        const matchingOptions = getMatchingOptions({
            outputTypes: ["start"]
        })
        setOptions(matchingOptions)
    }

    const addItemToPipeline = (item) => {
        const _stages = _.cloneDeep(stages)
        const _event = _.cloneDeep(item)
        //in the case of 'any', copy the output type of the previous stage
        if (_event.outputTypes.includes('any')) {
            _event.outputTypes = _stages[_stages.length - 1].outputTypes
            _event.inputTypes = _stages[_stages.length - 1].outputTypes
        }
        _stages.push(_event)
        setStages(_stages)

        setOptions(getMatchingOptions(_event, true))
        setValue(value + 1)
    }


    const onItemClick = (event) => {
        if (event.name === 'translate') {
            setCurrentOption(_.cloneDeep(event))
            setHideTranslateDialog(true)
        } else {
            addItemToPipeline(event)
        }

    }

    const renderOptions = () => {
        if (options) {
            return (
                <div style={{ display: "flex", flexWrap: "wrap", padding: "30px", overflow: "auto" }} >
                    {options.map((option) => {
                        return (<OptionCard option={option} onClickHandler={onItemClick} />)
                    })}
                </div>
            )
        }

    }

    const toggleHideDialog = () => {
        setHideTranslateDialog(!hideTranslateDialog)
    }

    const onDialogSave = (event) => {
        console.log(event)
        const newOption = currentOption
        newOption.serviceSpecificConfig = { to: selectedLanguage }
        setHideTranslateDialog(false)
        addItemToPipeline(newOption)
    }

    const onDialogCancel = (event) => {
        setHideTranslateDialog(false)
    }

    const onTranslateDialogChange = (_, data) => {
        const value = data.value
        let key = null
        for (const l of languages) {
            if (l.text === value) {
                key = l.key
                break
            }
        }
        if (key) {
            setSelectedLanguage(key)
        }

    }

    const renderStageTop = () => {
        return (
            <>
                <Dialog
                    open={hideTranslateDialog}
                    closeOnOutsideClick
                    styles={{height: "300px"}}
                    cancelButton="Cancel"
                    confirmButton="Confirm"
                    content= {
                        <>
                            Select the target language to translate your documents.
                            <Dropdown
                                search
                                placeholder="Select an option"
                                label="Languages"
                                items={languagesText}
                                autoSize
                                styles={dropdownStyles}
                                onChange={onTranslateDialogChange}
                                noResultsMessage="We couldn't find any matches."
                                getA11ySelectionMessage={{
                                onAdd: item => `${item} has been selected.`,
                                }}
                            />
                        </>
                    }
                    header="Translate to language"
                    onCancel={onDialogCancel}
                    onConfirm={onDialogSave}
                >
                    
                </Dialog>
                <Label theme={props.theme} style={{ fontFamily: props.theme.fonts.xLarge.fontFamily, fontSize: props.theme.fonts.xLarge.fontSize }}>Select a stage to add it to your pipeline configuration</Label>
                {renderOptions(options)}
            </>
        )
    }

    const renderStageBottom = () => {
        if(stages && stages.length > 0){
            return (
                <>
                    <Label theme={props.theme} style={{ fontFamily: props.theme.fonts.xLarge.fontFamily, fontSize: props.theme.fonts.xLarge.fontSize }}>Pipeline Preview</Label>
                    <PipelinePreview stages={stages} />
                    <div style={{
                        marginLeft: "700px",
                        marginBottom: "50px"
                    }}>
                        <Button onClick={onResetPipeline} content="Reset Pipeline"/>{' '}
                        <Button onClick={onDone} content="Done" primary />{' '}
                    </div>
                </>
            )
        }
        
    }

    const renderStage = () => {
        return (
            <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
                {renderStageTop()}
                {renderStageBottom()}
            </div>
        )
    }

    return (<>
        {renderStage()}
    </>)


}