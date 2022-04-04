import React, {useState} from 'react'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, TextField } from '@fluentui/react';


export default function FormRecCustomDialog(props) {

    const [modelId, setModelId] = useState(null)

    const toggleHideDialog = () => {
        props.setHideDialog(!props.hideDialog)
    }

    const dialogContentProps = {
        type: DialogType.largeHeader,
        title: 'Model ID',
        subText: 'Enter the Form Recognizer Custom Model ID',
    };

    const modalProps = {
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
    };

    const onDialogSave = (event) => {
        console.log(event)
        const newOption = props.currentOption
        newOption.serviceSpecificConfig = { modelId: modelId }
        props.setHideDialog(true)
        props.addItemToPipeline(newOption)
    }

    const onDialogCancel = (event) => {
        props.setHideDialog(true)
    }

    const onDialogChange = (event, newValue) => {
        setModelId(newValue)
    }


    return (
        <Dialog
            hidden={props.hideDialog}
            onDismiss={toggleHideDialog}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
        >
            <TextField value={modelId} onChange={onDialogChange}/>
            <DialogFooter>
                <PrimaryButton onClick={onDialogSave} text="Save" />
                <PrimaryButton onClick={onDialogCancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    )
} 