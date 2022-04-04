import React, {useState} from 'react'
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
    const toggleHideDialog = () => {
        props.setHideDialog(!props.hideDialog)
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

    return (
        <Dialog
            hidden={props.hideDialog}
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
                <Button onClick={onDialogSave} text="Save" />
                <Button onClick={onDialogCancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    )
} 