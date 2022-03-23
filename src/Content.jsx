
import React, { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import Stages from './Stages'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from './Upload';
import OcrLangCner from './OcrLangCner';
import OcrLangNer from './OcrLangNer';
import FormRecGeneralDoc from './FormRecGeneralDoc';


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
            case 'upload documents':
                return (<Upload />)
            case 'configure pipeline':
                return (<Stages />)
            case 'ocr lang cner':
                return (<OcrLangCner documents={documents} />)
            case 'ocr lang ner':
                return(<OcrLangNer documents={documents}/>)
            case 'formrec general doc':
                return(<FormRecGeneralDoc documents={documents}/>)
            default:
                return (<>error {documents}</>)
        }
    }

    return (
        <div className="content" >

            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('upload documents')}}>Upload Documents</MenuItem>
                    <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('configure pipeline')}}>Configure Pipeline</MenuItem>
                </Menu>
            </ProSidebar>

            <div className="content center" >
                {renderContent()}
            </div>
        </div>
    )

  //   return (
  //     <div className="content" >

  //         <ProSidebar>
  //             <Menu iconShape="square">
  //                 <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('upload documents')}}>Upload Documents</MenuItem>
  //                 <SubMenu title="Extraction Patterns" >
  //                     <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('ocr lang ner')}}>OCR + Language Studio NER</MenuItem>
  //                     <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('ocr lang cner')}}>OCR + Language Studio Custom NER</MenuItem>
  //                     <MenuItem className="menuItem" onClick={()=>{setSelectedMenuItem('formrec general doc')}}>Form Recognizer : General Document</MenuItem>
  //                 </SubMenu>
  //                 <SubMenu title="Classification Patterns" />
  //                 <SubMenu title="Translation Patterns" />
  //                 <SubMenu title="Summarization Patterns" />
  //             </Menu>
  //         </ProSidebar>

  //         <div className="content center" >
  //             {renderContent()}
  //         </div>
  //     </div>
  // )

}