import React, { useState } from 'react'
import { Dialog, DialogFooter, Dropdown, Button } from '@fluentui/react-northstar';


export default function LanguageDialog(props) {

    const [selectedLanguage, setSelectedLanguage] = useState(null)

    const dropdownStyles = {
        dropdown: { width: 300 },
    };

    const languages = [
        { key: 'en', text: 'English' },
        { key: 'es', text: 'Spanish' },
        { key: 'th', text: 'Thai' },
        { key: 'fr', text: 'French' },
    ];

    const languagesToStrings = () => {
        const out = []
        for(const l of languages){
            out.push(l.text)
        }
        return out
    }


    const dialogContentProps = {
        title: 'Translate To Language',
        subText: 'Select the target language to translate your documents.',
    };

    const modalProps = {
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
    };

    const onDialogSave = (event) => {
        console.log(event)
        const newOption = props.currentOption
        newOption.serviceSpecificConfig = { to: selectedLanguage }
        props.setHideDialog(true)
        props.addItemToPipeline(newOption)
    }

    const onDialogCancel = (event) => {
        props.setHideDialog(true)
    }

    const onTranslateDialogChange = (event, dropObject) => {
            setSelectedLanguage(languages[dropObject.highlightedIndex].key)
    }

    return (
        // <Dialog
        //     hidden={props.hideDialog}
        //     onDismiss={toggleHideDialog}
        //     dialogContentProps={dialogContentProps}
        //     modalProps={modalProps}
        // >
        //     <Dropdown
        //         placeholder="Select an option"
        //         label="Languages"
        //         options={languages}
        //         styles={dropdownStyles}
        //         onChange={onTranslateDialogChange}
        //     />
        //     <DialogFooter>
        //         <Button onClick={onDialogSave} text="Save" />
        //         <Button onClick={onDialogCancel} text="Cancel" />
        //     </DialogFooter>
        // </Dialog>
        <Dialog
            content={{
                children: (Component, props) => {
                    // const { styles, ...rest } = props
                    return (
                        <div style={{}}>
                            <Dropdown
                                placeholder="Select an option"
                                label="Languages"
                                items={languagesToStrings()}
                                // styles={dropdownStyles}
                                onChange={onTranslateDialogChange}
                            />
                        </div>
                    )
                },
            }}
            open={!props.hideDialog}
            cancelButton="Cancel"
            confirmButton="Submit"
            onConfirm={onDialogSave}
            onCancel={onDialogCancel}
            style={{height:"200px"}}
        />
    )
} 