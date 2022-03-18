import React, {useState} from 'react';

function OcrLangCner(props) {
    const [document, setDocument] = useState(null)

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
        console.log(`ner : ${JSON.stringify(document.cner)}`)
        let lastOffset = currentText.length*2
        for (let i = document.cner.length - 1; i >= 0; i--) {
          console.log(`ner category ${document.cner[i].category}`)
          let color = null
          if (categories[document.cner[i].category]) {
            color = categories[document.cner[i].category]
          } else {
            categories[document.cner[i].category] = colors[colorIndex % colors.length]
            color = colors[colorIndex % colors.length]
            colorIndex++
          }
          if((document.cner[i].offset + document.cner[i].length) < lastOffset){
            console.log(lastOffset)
            lastOffset = document.cner[i].offset
            currentText = highlightText(currentText, document.cner[i].offset, document.cner[i].length, color)
          }
         
        }
        const keys = Object.keys(categories)
        const values = []
        for (const k of keys) {
          values.push({ [k]: categories[k] })
        }
  
        console.log(JSON.stringify(values))
        return (
            <div className='documentText'>
                OCR Results:
                <div style={{ padding: 30 }} dangerouslySetInnerHTML={{ __html: currentText }}></div>
            </div>
        );
      }
    }
  
    const documentSelected = async (selectedDocument) => {
      setDocument(selectedDocument)
    }
  
    const parseData = (documents) => {
      console.log(`parseData : ${JSON.stringify(documents)}`)
      const filteredDocs = documents.filter(item => {
          if(item.cner){
              return true
          }
          return false
      })
      if (filteredDocs) {
        return (
          <>
            <div className="filenameHeader">Processed Files (select one)</div>
            {filteredDocs.map(document => (<div className="filename" onClick={() => { documentSelected(document) }}>{document.filename}</div>))}
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
        console.log(`ner : ${JSON.stringify(document.cner)}`)
        for (let i = document.cner.length - 1; i >= 0; i--) {
          console.log(`ner category ${document.cner[i].category}`)
          let color = null
          if (categories[document.cner[i].category]) {
            color = categories[document.cner[i].category]
          } else {
            categories[document.cner[i].category] = colors[colorIndex % colors.length]
            color = colors[colorIndex % colors.length]
            colorIndex++
          }
          currentText = highlightText(currentText, document.cner[i].offset, document.cner[i].length, color)
        }
        const keys = Object.keys(categories)
        const values = []
        for (const k of keys) {
          values.push({ key: k, value: categories[k] })
        }
  
        console.log(JSON.stringify(values))
        return (
          <>
           <div className="filenameHeader">Custom NER Results</div>
            {values.map(v => (
              <>
                <div className='resultLabel'><span class="dot" style={{ backgroundColor: v.value }}></span> {v.key}</div>
              </>
            ))}
          </>
        )
      }
    }
    return (
        <div className="documentTextParent" style={{padding : "30px"}}>
            <div className="filenames">
                {parseData(props.documents)}
            </div>
            {getText()}
            <div className='filenames'>
                {showLegend()}
            </div>
        </div>
    )
}

export default OcrLangCner

