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
        //this.setState({ bookmarks: this.props.bk })
        this.getBookmarks();
    }

    getBookmarks = () => {
        if (chrome && chrome.permissions) {
            this.getBookmarksFromChrome();
        } else {
            this.getBookmarksFromFile();
        }
    }
    getBookmarksFromFile = () => {
        // const bk = import("./bookmarks.js");
        // bk.then(res => {
        //     this.bookmarks = res.bk.children;
        // });
    }
    getBookmarksFromChrome = () => {
        console.log(chrome);
        chrome.bookmarks.getTree(bookmarkTree => {
            console.log("bookmarks tree -> " + bookmarkTree);
            console.log(bookmarkTree);
            const bookmarks = bookmarkTree[0].children[0];
            this.setState({ bookmarks: bookmarks })
            //bkContener.textContent= JSON.stringify(startTreeNodes[0].children[0].children[0])
        });
    }

    render() {
        if (!this.state.bookmarks) return ('Is Empty');

        const bookmarks = this.state.bookmarks.children
        //console.log(bookmarks)

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
