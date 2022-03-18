import React, { useState } from 'react';


function FormRecGeneralDoc(props) {
  const [document, setDocument] = useState(null)

  const parseData = (documents) => {
    const filteredDocs = documents.filter(item => {
      if (item.formrecGeneralDoc) {
        return true
      }
      return false
    })
    if (filteredDocs) {
      return (
        <>
          <div className="filenameHeader">Processed Files (select one)</div>
          {filteredDocs.map(doc => (<div className="filename" onClick={() => { setDocument(doc) }}>{doc.filename}</div>))}
        </>
      )
    }
    return (<></>)
  }

  const renderKVP = () => {
    if (document?.formrecGeneralDoc?.keyValuePairs) {
      return (
        <div style={{ height: "700px", overflow: "auto" }}>
          <div className="filenameHeader">Key/Value Pairs</div>
          {document.formrecGeneralDoc.keyValuePairs.map(kvp => {
            return (
              <div style={{ display: "flex", borderStyle: "solid", borderWidth: "0 0 1px 0px" }}>
                <div>
                  <div style={{ padding: "20px" }}>
                    Key : <span style={{ color: 'blue' }}>{kvp.key.content}</span>
                  </div>
                  <div style={{ paddingLeft: "20px", paddingBottom: "20px" }}>
                    Value : <span style={{ color: 'orange' }}>{kvp?.value?.content ? kvp.value.content : ""}</span>
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  Confidence Score : <span style={{ color: 'green' }}>{kvp.confidence}</span>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }

  const renderEntities = () => {
    if (document?.formrecGeneralDoc?.keyValuePairs) {
      return (
        <div style={{ paddingLeft: "150px", height: "700px", overflow: "auto" }}>
          <div className="filenameHeader">Named Entities</div>
          {document.formrecGeneralDoc.entities.map(kvp => {
            return (
              <div style={{ display: "flex", borderStyle: "solid", borderWidth: "0 0 1px 0px" }}>

                <div style={{ padding: "20px" }}>
                  Entity : <span style={{ color: 'blue' }}> {kvp.content}  </span>
                </div>


                <div style={{ padding: "20px", float: "right" }}>
                  Confidence Score : <span style={{ color: 'green' }}>{kvp.confidence}</span>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }

  const renderData = () => {
    if (document) {
      return (<div style={{ display: "flex" }}>
        {renderKVP()}
        {renderEntities()}
      </div>
      )
    }
  }


  return (
    <div className="documentTextParent" style={{ padding: "30px" }}>
      <div className="filenames">
        {parseData(props.documents)}
      </div>
      <div style={{ paddingLeft: "150px" }}>
        {renderData()}
      </div>

    </div>
  )
}

export default FormRecGeneralDoc

