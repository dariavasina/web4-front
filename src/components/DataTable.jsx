import React, { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import EntryService from '../services/EntryService';
import {setValues, addValue} from "../slices/EntrySlice";
import {useDispatch} from "react-redux";

export default function DataTable() {
    const dispatch = useDispatch();

    //const [stateEntries, setStateEntries] = useState([]);
    
    // componentDidMount() {
    //     EntryService.getEntries().then((res) => {
    //         console.log("res: ");
    //         console.log(res);
    //         this.setState( {entries : res.data} );
    //     });
    // }

    const {valuesArray} = useSelector(state => state.entry);

    useEffect( () => {
        EntryService.getEntries().then((res) => {
            console.log("res: ");
            console.log(res.data);
            dispatch(setValues(res.data));
        });

    }, []);

    useEffect( () => {
        console.log("valuesArray in DataTable:", valuesArray);
    }, [valuesArray]);

    return (
        <div>
            {valuesArray && valuesArray.length > 0 ? (
            <div className='row'>
                <table className='table table-striped table-bordered'>
                        <thead>
                            <tr> 
                                <th> X </th>
                                <th> Y </th>
                                <th> R </th>
                                <th> hit </th>
                                <th> response time </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                valuesArray.map(
                                    entry =>
                                    <tr key = {entry.id}>
                                        <td> { entry.x }</td>
                                        <td> { entry.y }</td>
                                        <td> { entry.r }</td>
                                        <td> { entry.hit.toString() }</td>
                                        <td> { entry.responseTime }</td>

                                    </tr>
                                )
                            }
                            {/* {
                                entries.map(
                                    entry =>
                                    <tr key = {entry.id}>
                                        <td> { entry.x }</td>
                                        <td> { entry.y }</td>
                                        <td> { entry.r }</td>
                                        <td> { entry.hit.toString() }</td>
                                        <td> { entry.responseTime }</td>

                                    </tr>
                                )
                            } */}
                        </tbody>

                </table>

            </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}