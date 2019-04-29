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

            //попытка сделать папку для закладок без папки
            // const emptyFolder = { title: 'Пустая', id: 89898989, index: 0, children: [] }
            // console.log(bookmarks)
            // for (let i in bookmarks) {

            //     const curBk = bookmarks[i]

            //     if (!curBk.children) {
            //         curBk.index = emptyFolder.children.length
            //         emptyFolder.children.push(curBk)
            //         //bookmarks.splice(i, 1)
            //         //i = i - 1
            //     }
            // }
            // console.log(emptyFolder)
            // bookmarks.push(emptyFolder)
            // console.log(bookmarks)
            //-

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
