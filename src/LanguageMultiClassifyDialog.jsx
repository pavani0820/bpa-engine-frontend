import React, {useState} from 'react'
import { Dialog, DialogFooter, Button, Input, Label } from '@fluentui/react-northstar';


export default function LanguageMultiClassifyDialog(props) {

    const [projectName, setProjectName] = useState(null)
    const [deploymentName, setDeploymentName] = useState(null)

    const toggleHideDialog = () => {
        props.setHideDialog(!props.hideDialog)
    }

    const dialogContentProps = {
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

            content={{
                children: (Component, props) => {
                    const { styles, ...rest } = props
                    return (
                        <div style={{  }}>
                            <div>
                                <Label>Project Name</Label>
                                <Input value={projectName} onChange={onProjectNameDialogChange} />
                            </div>

                            <div>
                                <Label>Deployment Name</Label>
                                <Input value={deploymentName} onChange={onDeploymentNameDialogChange} />
                            </div>

                        </div>
                    )
                },
            }}
            open={!props.hideDialog}
            cancelButton="Cancel"
            confirmButton="Submit"
            onConfirm={onDialogSave}
            onCancel={onDialogCancel}
        />
    )
} 