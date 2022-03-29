
import React, { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import Stages from './Stages'
import CurrentPipeline from './CurrentPipeline'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from './Upload';


export default function Content() {

    const [selectedMenuItem, setSelectedMenuItem] = useState("upload documents");
    // const [documents, setDocuments] = useState(null)

    useEffect(() => {
        fetch('/api/leases')
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(`data: ${data}`))
                //doccuments(data)
            })
    }, []);


    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'CURRENT_PIPELINE':
                return (<CurrentPipeline />)
            case 'CONFIGURE_PIPELINE':
                return (<Stages />)
            case 'UPLOAD_DOCUMENTS':
                return (<Upload />)

            default:
                return (<Upload />)
        }
    }

    return (
        <div className="content" >

            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem className="menuItem" onClick={() => { setSelectedMenuItem('CURRENT_PIPELINE') }}>Current Pipeline</MenuItem>
                    <MenuItem className="menuItem" onClick={() => { setSelectedMenuItem('CONFIGURE_PIPELINE') }}>Configure Pipeline</MenuItem>
                    <MenuItem className="menuItem" onClick={() => { setSelectedMenuItem('UPLOAD_DOCUMENTS') }}>Upload Documents</MenuItem>

                </Menu>
            </ProSidebar>

            <div className="content center" >
                {renderContent()}
            </div>
        </div>
    )

}