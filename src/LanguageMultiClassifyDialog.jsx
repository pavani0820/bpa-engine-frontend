import React, {useState} from 'react'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, TextField, Label } from '@fluentui/react';


export default function LanguageMultiClassifyDialog(props) {

    const [projectName, setProjectName] = useState(null)
    const [deploymentName, setDeploymentName] = useState(null)

    const toggleHideDialog = () => {
        props.setHideDialog(!props.hideDialog)
    }

    const dialogContentProps = {
        type: DialogType.largeHeader,
        title: 'Custom Mulit-Class',
        subText: 'Enter the Project and Deployment Name for your custom model',
    };

    const modalProps = {
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
    };

    const onDialogSave = (event) => {
        console.log(event)
        const newOption = props.currentOption
        newOption.serviceSpecificConfig = { projectName: projectName, deploymentName: deploymentName }
        props.setHideDialog(true)
        props.addItemToPipeline(newOption)
    }

    const onDialogCancel = () => {
        props.setHideDialog(true)
    }

    const onProjectNameDialogChange = (event, newValue) => {
        setProjectName(newValue)
    }

    const onDeploymentNameDialogChange = (event, newValue) => {
        setDeploymentName(newValue)
    }


    return (
        <Dialog
            hidden={props.hideDialog}
            onDismiss={toggleHideDialog}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
        >
            <Label>Project Name</Label>
            <TextField value={projectName} onChange={onProjectNameDialogChange}/>
            <Label>Deployment Name</Label>
            <TextField value={deploymentName} onChange={onDeploymentNameDialogChange}/>
            <DialogFooter>
                <PrimaryButton onClick={onDialogSave} text="Save" />
                <PrimaryButton onClick={onDialogCancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    )
} 