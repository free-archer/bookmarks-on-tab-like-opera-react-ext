import React from 'react';
import './BkItem.css';

export default class BkItem extends React.PureComponent {
    constructor(props) {
        super(props)

        this.actionClickBk = this.actionClickBk.bind(this)
    }

    getClassColor() {
        const colorInd = Math.round(Math.random() * 10)
        const className = { backgroundColor: `var(--bg-color${colorInd})` }
        return className
    }

    getClassColorFromId(currentBk) {
        let styles = {}
        if (currentBk) {
            const colorInd = currentBk.id.substr(-1)
            styles.backgroundColor = `var(--bg-color${colorInd})`;
            //styles.backgroundImage = `url("${currentBk.url}")`;
        } else {
            styles = { backgroundColor: `var(--bg-color0)` }
        }
        return styles
    }

    cutTitle(title) {
        return title.substring(0, 40)
    }

    actionClickBk(url, evt) {
        evt.preventDefault();
        //window.open(url).focus();
        window.open(url, "_self");
    }

    render() {
        const { currentBk, title } = this.props
        //const style = this.getClassColor()
        const style = this.getClassColorFromId(currentBk)
        /*if (currentBk.url) {
            style.backgroundImage= `url(${currentBk.url})`;
        }*/

        return (
            <div
                className="bk-item"
                style={style}
                onClick={(evt) => this.actionClickBk(currentBk.url, evt)}
            >
                {this.cutTitle(title)}
            </div>
        )
    }
}