import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Body() {

  const [image, setImage] = useState(null);

  //const documentFetchResults = useSWR('/api/v1/leases', fetcher)

  const [document, setDocument] = useState(null)
  const [documents, setDocuments] = useState([])

  //modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const [showFail, setShowFail] = useState(false);
  const handleCloseFail = () => setShowFail(false);
  //const handleShowFail = () => setShowFail(true);


  useEffect(() => {
    fetch('/api/leases')
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(`data: ${data}`))
        setDocuments(data)
      })
  }, []);

  const uploadToClient = async (event) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];

        if (i.name) {
          console.log(`image : ${i}`)
          setImage(i.name);
          // setCreateObjectURL(URL.createObjectURL(i));
          const body = new FormData();
          body.append("file", i);
          console.log("sending...")
          const response = await fetch(`/api/documents?filename=${i.name}`, {
            method: "POST",
            body
          });
          setShow(true)
          console.log(` response ${JSON.stringify(response.body)}`)
        } else {
          setShowFail(true)
        }

      }
    } catch (err) {
      console.log(err)
      setShowFail(true)
    }
  };

  const colors = ["#007BEB", "#20B883", "#A0F09A", "#E0056C", "#000FF0", "#60C6F7"]

  const highlightText = (text, offset, textLength, color) => {
    const result = text.substring(0, offset - 1) + ` <span style="background-color:${color}">` + text.substring(offset, offset + textLength) + `</span> ` +
      text.substring(offset + textLength + 1, document.ocr.length);
    return result
  }

  const getText = () => {
    if (document) {
      let currentText = document.ocr
      let colorIndex = 0
      let categories = {}
      console.log(`ner : ${JSON.stringify(document.ner)}`)
      for (let i = document.ner.length - 1; i >= 0; i--) {
        console.log(`ner category ${document.ner[i].category}`)
        let color = null
        if (categories[document.ner[i].category]) {
          color = categories[document.ner[i].category]
        } else {
          categories[document.ner[i].category] = colors[colorIndex % colors.length]
          color = colors[colorIndex % colors.length]
          colorIndex++
        }
        currentText = highlightText(currentText, document.ner[i].offset, document.ner[i].length, color)
      }
      const keys = Object.keys(categories)
      const values = []
      for (const k of keys) {
        values.push({ [k]: categories[k] })
      }

      console.log(JSON.stringify(values))
      return (
        <div style={{ padding: 30 }} dangerouslySetInnerHTML={{ __html: currentText }}></div>
      );
    }
  }

  const documentSelected = async (selectedDocument) => {
    setDocument(selectedDocument)
  }

  const parseData = (documents) => {
    console.log(`parseData : ${JSON.stringify(documents)}`)
    if (documents) {
      return (
        <>
          {documents.map(document => (
            <div className="filename" onClick={() => { documentSelected(document) }}>{document.filename}</div>
          ))}
        </>
      )
    }
    return (<></>)
  }

  const showLegend = () => {
    if (document) {
      let currentText = document.ocr
      let colorIndex = 0
      let categories = {}
      console.log(`ner : ${JSON.stringify(document.ner)}`)
      for (let i = document.ner.length - 1; i >= 0; i--) {
        console.log(`ner category ${document.ner[i].category}`)
        let color = null
        if (categories[document.ner[i].category]) {
          color = categories[document.ner[i].category]
        } else {
          categories[document.ner[i].category] = colors[colorIndex % colors.length]
          color = colors[colorIndex % colors.length]
          colorIndex++
        }
        currentText = highlightText(currentText, document.ner[i].offset, document.ner[i].length, color)
      }
      const keys = Object.keys(categories)
      const values = []
      for (const k of keys) {
        values.push({ key: k, value: categories[k] })
      }

      console.log(JSON.stringify(values))
      return (
        <>
          {values.map(v => (
            <>
              <div><span class="dot" style={{ backgroundColor: v.value }}></span> {v.key}</div>
            </>
          ))}
        </>
      )
    }
  }

  const renderBody = () => {
    if (documents && documents.length > 0) {
      return (<div className="documentTextParent">
        <div className="filenames">
          {parseData(documents)}
        </div>
        <div className="documentText">
          {getText()}
        </div>
        <div >
          {showLegend()}
        </div>

      </div>)
    } else {
      return (
        <div>No Content Uploaded</div>
      )
    }

  }


  return (

    <div class="container" >
      
      <main class="main"  style={{ backgroundColor: "blue",width: "100%" }}>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem >Dashboard</MenuItem>
          <SubMenu title="Components" >
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>File Uploaded</Modal.Title>
          </Modal.Header>
          <Modal.Body>{image} uploaded successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showFail} onHide={handleCloseFail}>
          <Modal.Header closeButton>
            <Modal.Title>File Upload Failed</Modal.Title>
          </Modal.Header>
          <Modal.Body>{image} did not upload successfully.  Check the logs for more information.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFail}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          <label class="custom-file-upload">
            <input type="file" name="myImage" onChange={uploadToClient} />
            Select PDF File
          </label>
        </div>
        {renderBody()}


      </main>

    </div>
  )
}
