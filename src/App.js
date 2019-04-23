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
        console.log(chrome);
        chrome.bookmarks.getTree(bookmarkTree => {
            const bookmarks = bookmarkTree[0].children[0];
            this.setState({ bookmarks: bookmarks })
        });
    }

    render() {
        if (!this.state.bookmarks) return ('Is Empty');

        const bookmarks = this.state.bookmarks.children

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
