import React from 'react';
import './BkItem.css';

const getClassColor = () => {
    const colorInd = Math.round(Math.random() * 10)
    const className = { backgroundColor: `var(--bg-color${colorInd})` }
    return className
}

const actionClickBk = (url, evt) => {
    evt.preventDefault();
    //window.open(url).focus();
    window.open(url, "_self");
}

export default ({ title, currentBk }) => {
    const style = getClassColor()
    return (
        <div
            className="bk-item"
            style={style}
            onClick={(evt) => actionClickBk(currentBk.url, evt)}
        >
            {title}


        </div>
    )
}