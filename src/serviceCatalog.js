import pdf from './images/pdf.png'
import logo from './images/imagetbd.png'
import sentiment from './images/sentimentDemoLogo.svg'

export const sc = {
    "pdf": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "start"
        ],
        "outputTypes": [
            "pdf"
        ],
        "image": pdf,
        "label": "PDF Document",
        "name": "pdf",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "wav": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "start"
        ],
        "outputTypes": [
            "wav"
        ],
        "image": sentiment,
        "label": "WAV Document",
        "name": "wav",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "ocrService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf",
            "jpg"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Optical Character Recognition (OCR) Service",
        "name": "ocr",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "translateService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Language Translation Service",
        "name": "translate",
        "serviceSpecificConfig": {
            to : "string"
        },
        "serviceSpecificConfigDefaults": {}
    },
    "formrecLayoutService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "formrecLayout"
        ],
        "image": logo,
        "label": "Form Recognizer Layout Service",
        "name": "formrecLayout",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "viewService": {
        "inputTypes": [
            "any"
        ],
        "outputTypes": [
            "any"
        ],
        "image": logo,
        "label": "Export Last Stage To DB",
        "name": "view",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "summarizeService": {
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Language Studio Text Summarization",
        "name": "summarize",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "languageNerService": {
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "languageNer"
        ],
        "image": logo,
        "label": "Language Studio Named Entity Recognition",
        "name": "languageNer",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "sttService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "wav",
            "mp3"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Speech To Text Service",
        "name": "stt",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    }
}