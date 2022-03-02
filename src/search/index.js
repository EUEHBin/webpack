/**
 * @Description:
 * @author Bin Gu
 * @date 2022/1/5
 */
'use strict'

import React from "react";
import ReactDOM from 'react-dom'
import './search.css'
import './search.less'
import logo from '../image/1.jpg'

class Index extends React.Component {
    render() {
        return <div className="search-text">
            Search Text 11111111111111119999***---*****--
            <p className="color">text color blue</p>
            <img src={logo} alt=""/>
        </div>
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)