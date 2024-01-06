import React, { Component } from 'react';
import { Slider } from 'primereact/slider';

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Васина Дарья Анатольевна</h1>
                    <p>Номер группы: P3212</p>
                    <p>Вариант: 2305</p>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;