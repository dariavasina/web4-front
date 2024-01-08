import React, { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import EntryService from '../services/EntryService';
import {setValues, addValue} from "../slices/EntrySlice";
import {useDispatch} from "react-redux";

export default function DataTable() {
    const dispatch = useDispatch();

    const {valuesArray} = useSelector(state => state.entry);
    const username = localStorage.getItem('username');

    useEffect( () => {
        if (username) {
            EntryService.getEntriesByUsername(username).then((res) => {
                console.log("res: ");
                console.log(res.data);
                dispatch(setValues(res.data));
            });
        }
       

    }, [username]);

    useEffect( () => {
        console.log("valuesArray in DataTable:", valuesArray);
    }, [valuesArray]);

    return (
        <div>
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
        </div>
    );
}