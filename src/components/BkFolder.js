import React, { Component } from 'react';
import './BkFolder.css';

import BkModal from './BkModal'

export default class BkFolder extends Component {
    constructor(props) {
        super(props)

        this.setOpenFolder = this.setOpenFolder.bind(this)

        this.state = {
            isOpenFolder: false
        }
    }

    setOpenFolder = () => {
        this.setState({ isOpenFolder: !this.state.isOpenFolder })
        console.log(this.state.isOpenFolder)
    }

    render() {
        const { title, currentBk } = this.props
        return (
            <React.Fragment >
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <div
                    className="bk-folder"
                    onClick={this.setOpenFolder.bind(this)}
                >

                    {title}

                </div>

                {this.state.isOpenFolder &&
                    <BkModal
                        bkFolder={currentBk}
                        title={title}
                        setOpenFolder={this.setOpenFolder}
                        isOpenFolder={this.state.isOpenFolder}
                    />
                }
            </React.Fragment >
        )
    }
}