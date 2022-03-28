
import React, { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import Stages from './Stages'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from './Upload';


export default function Content() {

    const [selectedMenuItem, setSelectedMenuItem] = useState("upload documents");
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
        fetch('/api/leases')
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(`data: ${data}`))
                setDocuments(data)
            })
    }, []);


    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'UPLOAD_DOCUMENTS':
                return (<Upload />)
            case 'CONFIGURE_PIPELINE':
                return (<Stages />)
            default:
                return (<Upload />)
        }
    }

    return (
        <div className="content" >

            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('UPLOAD_DOCUMENTS')}}>Upload Documents</MenuItem>
                    <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('CONFIGURE_PIPELINE')}}>Configure Pipeline</MenuItem>
                </Menu>
            </ProSidebar>

            <div className="content center" >
                {renderContent()}
            </div>
        </div>
    )

}