/**
 * @Description:
 * @author Bin Gu
 * @date 2022/1/5
 */
'use strict'

import React from "react";
import ReactDOM from 'react-dom'
import './search.css'
import './seach.less'
import logo from './image/1.jpg'

class Search extends React.Component {
    render() {
        return <div className="search-text">
            Search Text 11111111111111119999***---
            <p className="color">text color blue</p>
            <img src={logo} alt=""/>
        </div>
    }
}

ReactDOM.render(
    <Search/>,
    document.getElementById('root')
)