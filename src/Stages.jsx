import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PipelinePreview from './PipelinePreview'
import OptionCard from './OptionCard';
import _ from 'lodash'

import { sc } from './serviceCatalog'
import { PrimaryButton } from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const dropdownStyles = {
    dropdown: { width: 300 },
};

const languages = [
    { key: 'en', text: 'English' },
    { key: 'es', text: 'Spanish' },
    { key: 'th', text: 'Thai' },
    { key: 'fr', text: 'French' },
];

export default function Stages(props) {

    const [serviceCatalog] = useState(sc)
    const [stages, setStages] = useState([])
    const [value, setValue] = useState(0)
    const [options, setOptions] = useState([])
    const [done, setDone] = useState(false)
    const [hideTranslateDialog, setHideTranslateDialog] = useState(true)
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

    const onDone = (event) => {
        setOptions([])
        setDone(true)
        axios.post('/api/config', { stages: stages.slice(1, stages.length), id: "1" })
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
            setHideTranslateDialog(false)
        } else {
            addItemToPipeline(event)
        }

    }

    const renderOptions = () => {
        if (options) {
            return (
                <div style={{ display: "flex", flexWrap: "wrap", padding: "30px", overflow: "auto" }} >
                    {options.map((option, index) => {
                        return (<OptionCard option={option} onClickHandler={onItemClick} />)
                    })}
                </div>
            )
        }

    }

    const toggleHideDialog = () => {
        setHideTranslateDialog(!hideTranslateDialog)
    }

    const dialogContentProps = {
        type: DialogType.largeHeader,
        title: 'Translate To Language',
        subText: 'Select the target language to translate your documents.',
    };

    const modalProps = {
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
    };

    const onDialogSave = (event) => {
        console.log(event)
        const newOption = currentOption
        newOption.serviceSpecificConfig = { to: selectedLanguage }
        setHideTranslateDialog(true)
        addItemToPipeline(newOption)
    }

    const onDialogCancel = (event) => {
        setHideTranslateDialog(true)
    }

    const onTranslateDialogChange = (event) => {
        console.log(event)
        let key = null
        for (const l of languages) {
            if (l.text === event.currentTarget.textContent) {
                key = l.key
                break
            }
        }
        if (key) {
            setSelectedLanguage(key)
        }

    }

    const renderStage = () => {
        if (done) {
            return (<>{JSON.stringify(stages)}</>)
        }

        return (
            <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
                <Dialog
                    hidden={hideTranslateDialog}
                    onDismiss={toggleHideDialog}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                >
                    <Dropdown
                        placeholder="Select an option"
                        label="Languages"
                        options={languages}
                        styles={dropdownStyles}
                        onChange={onTranslateDialogChange}
                    />
                    <DialogFooter>
                        <PrimaryButton onClick={onDialogSave} text="Save" />
                        <PrimaryButton onClick={onDialogCancel} text="Cancel" />
                    </DialogFooter>
                </Dialog>
                <Label theme={props.theme} style={{ fontFamily: props.theme.fonts.xxLarge.fontFamily, fontSize: props.theme.fonts.xxLarge.fontSize }}>Select a stage to add it to your pipeline configuration:</Label>
                {renderOptions(options)}
                <Label theme={props.theme} style={{ fontFamily: props.theme.fonts.xxLarge.fontFamily, fontSize: props.theme.fonts.xxLarge.fontSize }}>Pipeline Preview:</Label>
                <PipelinePreview stages={stages} />
                <div>
                    <PrimaryButton onClick={onDone} style={{ margin: "50px" }} text="Done"></PrimaryButton>{' '}
                    <PrimaryButton onClick={onResetPipeline} text="Reset Pipeline"></PrimaryButton>{' '}
                </div>
            </div>
        )
    }

    return (<>
        {renderStage()}
    </>)


}