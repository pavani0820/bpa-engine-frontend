import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";

function Upload() {
    const fileTypes = ["PNG","JPG", "PDF"];

    const [image, setImage] = useState(null);
    const [show, setShow] = useState(false);
 
    const [showFail, setShowFail] = useState(false);


    const handleChange = async (file) => {
        console.log(file)
        try {
            if (file.name) {
                console.log(`image : ${file}`)
                setImage(file.name);
                console.log(image, show, showFail)
                // setCreateObjectURL(URL.createObjectURL(i));
                const body = new FormData();
                body.append("file", file);
                console.log("sending...")
                const response = await fetch(`/api/documents?filename=${file.name}`, {
                    method: "POST",
                    body
                });
                setShow(true)
                console.log(` response ${JSON.stringify(response.body)}`)
            } else {
                setShowFail(true)
            }
        } catch (err) {
            console.log(err)
            setShowFail(true)
        }
    }


    return (
        <div style={{ padding: "300px" }}>
            <h3 style={{ color: 'black', paddingBottom: "10px" }}>Upload a document to Blob Storage</h3>
            <p style={{ color: 'black', paddingBottom: "50px",width: "600px" }}>Before any insights can be viewed by a pattern, one or more documents must be uploaded.  The documents will be copied to Blob Storage which will trigger a Function App to process them.  The processing can take some time and the insights will not appear immediately.</p>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            
            
        </div>
    )
}

export default Upload

