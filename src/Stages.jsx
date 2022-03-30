import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from 'react-bootstrap'
import arrow from './images/arrow.png'
import OptionCard from './OptionCard';
import _ from 'lodash'

import { sc } from './serviceCatalog'
import { findByLabelText } from '@testing-library/react';


export default function Stages() {

    const [serviceCatalog] = useState(sc)
    const [stages, setStages] = useState([])
    const [value, setValue] = useState(0)
    const [options, setOptions] = useState([])
    const [done, setDone] = useState(false)

    useEffect(() => {
        const getSC = async () => {
            const matchingOptions = getMatchingOptions({
                outputTypes: ["start"]
            })
            setOptions(matchingOptions)

            // const result = await axios.get('/api/serviceCatalog')
            // setServiceCatalog(result.data)
        }
        getSC()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDone = (event) => {
        setOptions([])
        setDone(true)
        axios.post('/api/config', { stages: stages.slice(1, stages.length), id: "1" })
    }

    const getMatchingOptions = (previousStage, allowAny) => {
        const _options = []
        for (const k in serviceCatalog) {
            for (const acceptedInputType of serviceCatalog[k].inputTypes) {
                if (acceptedInputType === "any" && allowAny) {
                    _options.push(serviceCatalog[k])
                    break;
                }
                if (previousStage.outputTypes.includes(acceptedInputType.toLowerCase())) {
                    _options.push(serviceCatalog[k])
                    break;
                }
            }
        }
        return _options
    }

    const onResetPipeline = () => {
        setStages([])
        const matchingOptions = getMatchingOptions({
            outputTypes: ["start"]
        })
        setOptions(matchingOptions)
    }


    const onItemClick = (event) => {
        console.log("click")
        const _stages = _.cloneDeep(stages)
        const _event = _.cloneDeep(event)
        //in the case of 'any', copy the output type of the previous stage
        if (_event.outputTypes.includes('any')) {
            _event.outputTypes = _stages[_stages.length - 1].outputTypes
            _event.inputTypes = _stages[_stages.length - 1].outputTypes
        }
        _stages.push(_event)
        setStages(_stages)

        setOptions(getMatchingOptions(_event, true))
        setValue(value + 1)
    }

    const renderOptions = () => {
        if (options) {
            return (
                <div style={{ display:"flex",flexWrap : "wrap", padding: "30px", overflow:"auto" }} >
                    {options.map((option, index) => {
                        return (<OptionCard option={option} onClickHandler={onItemClick} />)
                    })}
                </div>
            )
        }

    }

    const renderPipeline = () => {
        if (stages) {
            return (
                <div style={{ display: "flex", padding: "30px", flexWrap : "wrap" }} >
                    {stages.map((option, index) => {
                        console.log(`index : ${index}`)
                        if (index === stages.length - 1) {
                            return (
                                <>
                                    <OptionCard option={option} />
                                </>)
                        } else {
                            return (
                                <>
                                    <OptionCard option={option} />
                                    <img src={arrow} alt="progress indicator" />
                                </>)
                        }
                    })}
                </div>
            )
        }
    }

    const renderStage = () => {
        if (done) {
            return (<>{JSON.stringify(stages)}</>)
        }

        return (<>
            <div style={{overflow:"auto"}}>
                <h4 style={{ marginLeft: "50px", marginTop: "30px" }}>Select a stage to add it to your pipeline configuration: </h4>
                {renderOptions(options)}
                <h4 style={{ marginLeft: "50px" }}>Pipeline Preview: </h4>
                {renderPipeline(stages)}
                <div>
                    <Button variant="primary" onClick={onDone} style={{ marginLeft: "50px" }}>Done</Button>{' '}
                    <Button variant="primary" onClick={onResetPipeline} style={{ marginLeft: "50px" }}>Reset Pipeline</Button>{' '}
                </div>

            </div>


        </>)
    }

    return (<>
        {renderStage()}
    </>)


}