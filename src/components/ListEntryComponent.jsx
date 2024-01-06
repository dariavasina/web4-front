import React, { Component } from 'react';
import EntryService from '../services/EntryService';

class ListEntryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            entries: []
        }
    }
    componentDidMount() {
        EntryService.getEntries().then((res) => {
            console.log("res: ");
            console.log(res);
            this.setState( {entries : res.data} );
        });
    }
    render() {
        
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
                                    this.state.entries.map(
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
                            </tbody>

                    </table>

                </div>

            </div>
        );
    }
}

export default ListEntryComponent;