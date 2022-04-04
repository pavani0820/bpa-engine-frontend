import React, {useState} from 'react'
import { Dialog, DialogFooter, Button, Input, Label } from '@fluentui/react-northstar';


export default function LanguageCustomNerDialog(props) {

    const [projectName, setProjectName] = useState(null)
    const [deploymentName, setDeploymentName] = useState(null)

    const toggleHideDialog = () => {
        props.setHideDialog(!props.hideDialog)
    }

    const dialogContentProps = {
        title: 'Custom Single Class',
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
            <Input value={projectName} onChange={onProjectNameDialogChange}/>
            <Label>Deployment Name</Label>
            <Input value={deploymentName} onChange={onDeploymentNameDialogChange}/>
            <DialogFooter>
                <Button onClick={onDialogSave} text="Save" />
                <Button onClick={onDialogCancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    )
} 