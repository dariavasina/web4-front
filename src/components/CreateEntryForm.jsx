import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {setXCoordinateAction, setYCoordinateAction, setRadiusAction, setValidAction, doNothingAction} from '../actions'; // Import your action
import { Button } from 'primereact/button';
import {connect} from 'react-redux'

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import EntryService from '../services/EntryService';
import { addValue } from '../slices/EntrySlice';

const CreateEntryForm = () => {
    const [selectedItemX, setSelectedItemX] = useState();
    const [selectedItemY, setSelectedItemY] = useState();
    const [selectedItemR, setSelectedItemR] = useState();
    // const [isValid, setIsValid] = useState();
    const [formData, setFormData] = useState({
        x: '',
        y: '',
        r: '0'
    });
    const dispatch = useDispatch();
    

    // const handleXCoordinate = (value) => {
    //     const validCoordinates = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'];
    //     if (!isNaN(value)) {
    //       setXCoordinate(value);
    //       setIsValid(true);
    //     } else {
    //       setIsValid(false);
    //     }
    //   };
    
    //   const handleRadius = (value) => {
    //     if (!isNaN(value) && parseInt(value) >= 0) {
    //       setRadius(value);
    //       setIsValid(true);
    //     } else {
    //       setIsValid(false);
    //     }
    //   };

    // const handleSubmit = (e) => {
    //     console.log("hehe")
    //     e.preventDefault();
    //     dispatch(doNothingAction)

    //     let data = {"x": }

    //     EntryService.createEntry()
    // };

    
    const handleChange = (e) => {
        const name = e.target.id;
        const value = e.target.value;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));    

        if (name === "x") {
            console.log("X")
            setSelectedItemX(e.target.value);
        }
        if (name === "r") {
            console.log("R")
            setSelectedItemR(e.target.value);
        }

        if (name === "y") {
            console.log("Y")
            setSelectedItemY(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        console.log("hehe")
        e.preventDefault();

        EntryService.createEntry(formData).then(res => {
            console.log("entry created");

            const hit = res.data.hit;
            const updatedFormData = {
                ...formData,
                hit: hit,
            };
            dispatch(addValue(updatedFormData));
            //dispatch(addValue(formData));
            //updateEntries();
        });

        // console.log(data);
        // dispatch(sendTry(data)).then(() => {
        //     dispatch(getTry());
        // });
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <div className="entry-container">
                <div className="input-group">
                    <label>
                    X Coordinate:         </label>
                    {['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'].map((value) => (
                        <Button id="x" key={value} value={value} onClick={(e) => handleChange(e)} type="button"> 
                        {value} 
                        </Button>
                    ))}

                </div>

                <div className="input-group">
                    <label>
                    Y Coordinate: </label>
                    <input
                        type="range"
                        id="y"
                        min={-3}
                        max={5}
                        step={1}    
                        value={selectedItemY}
                        onChange={(e) => handleChange(e)}
                    />

                    
                    {selectedItemY}
                </div>

                <div className="input-group">
                    <label>
                    Radius: </label>
                    
                    {['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'].map((value) => (
                        <Button id="r" key={value} value={value} onClick={(e) => handleChange(e)} type="button">
                        {value}
                        </Button>
                        
                    ))}
                </div>

                {/* {!isValid && <p>Radius can't be negative!</p>} */}

                
            </div>
            <Button type="submit" label="Check"/>
        </form>
    );
};

export default CreateEntryForm;