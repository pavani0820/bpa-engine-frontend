
import React, { useState } from 'react'
import Stages from './Stages'
import CurrentPipeline from './CurrentPipeline'
import Home from './Home'
import Upload from './Upload';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';




function _getCustomDivider(dividerProps) {
    const tooltipText = dividerProps.item ? dividerProps.item.text : '';
    return (
        <TooltipHost content={`Show ${tooltipText} contents`} calloutProps={{ gapSpace: 0 }}>
            <span aria-hidden="true" style={{ cursor: 'pointer', padding: 5 }}>
                /
            </span>
        </TooltipHost>
    );
}


export default function Content(props) {



    const [selectedMenuItem, setSelectedMenuItem] = useState("HOME");
    const [breadCrumbItems, setBreadCrumbItems] = useState([])

    const onBreadcrumbHome = () => {
        setSelectedMenuItem("HOME")
        setBreadCrumbItems([])
    }

    const onSelectContent = (content) => {
        console.log(content.currentTarget.id)
        switch (content.currentTarget.id) {
            case 'configure-pipeline':
                setSelectedMenuItem('CONFIGURE_PIPELINE')
                breadCrumbItems.push({ text: 'Home', key: 'home', onClick: onBreadcrumbHome })
                breadCrumbItems.push({ text: 'Configure Pipeline', key: 'config-pipeline', onClick: onBreadcrumbHome })
                setBreadCrumbItems(breadCrumbItems)
                break
            case 'view-pipeline':
                setSelectedMenuItem('CURRENT_PIPELINE')
                breadCrumbItems.push({ text: 'Home', key: 'home', onClick: onBreadcrumbHome })
                breadCrumbItems.push({ text: 'View Pipeline', key: 'view-pipeline', onClick: onBreadcrumbHome })
                setBreadCrumbItems(breadCrumbItems)
                break
            case 'upload':
                setSelectedMenuItem('UPLOAD_DOCUMENTS')
                breadCrumbItems.push({ text: 'Home', key: 'home', onClick: onBreadcrumbHome })
                breadCrumbItems.push({ text: 'Upload Documents', key: 'upload', onClick: onBreadcrumbHome })
                setBreadCrumbItems(breadCrumbItems)
                break
            default:
                break;
        }
    }

    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'HOME':
                return (<Home onClick={onSelectContent} theme={props.theme} />)
            case 'CURRENT_PIPELINE':
                return (<CurrentPipeline theme={props.theme} />)
            case 'CONFIGURE_PIPELINE':
                return (<Stages theme={props.theme} />)
            case 'UPLOAD_DOCUMENTS':
                return (<Upload />)

            default:
                return (<Home />)
        }
    }

    return (
        <div className="content" >
            <div style={{ paddingLeft: "200px", paddingTop: "50px" }}>
                <Breadcrumb items={breadCrumbItems} dividerAs={_getCustomDivider} theme={props.theme} />
                {renderContent()}
            </div>
        </div>
    )

}