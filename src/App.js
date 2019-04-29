import React, { Component } from 'react';
import './App.css';
import BkContainer from './components/BkContainer';

class App extends Component {
    constructor() {
        super()
        this.state = {
            bookmarks: null
        }
    }

    componentDidMount = () => {
        this.getBookmarksFromChrome();
    }

    getBookmarksFromChrome = () => {
        chrome.bookmarks.getTree(bookmarkTree => {
            const bookmarks = [...bookmarkTree[0].children[0].children, ...bookmarkTree[0].children[1].children, bookmarkTree[0].children[2]]
            this.setState({ bookmarks: bookmarks })
        });
    }

    render() {
        if (this.state.bookmarks == null) return ('Is Empty');

        const bookmarks = this.state.bookmarks

        return (
            <div className="bk-flex-contener">
                <div className="bk-main-contener">
                    {bookmarks.map((currentBk) => (
                        <BkContainer
                            key={currentBk.id}
                            bkFolder={currentBk}
                            title={currentBk.title}
                        />
                    )
                    )
                    }
                </div>
            </div>
        );
    }
}

export default App;
