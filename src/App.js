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

    prepareBookmarksSetEptiFolderAll(bookmarkTreeChildren) {
        const bookmarks = []
        const emptyFolder = { title: 'Пустая', id: 89898989, index: 0, children: [] }
        for (const curBkFolder of bookmarkTreeChildren) {
            console.log(curBkFolder, 'curBkFolder')
            for (const curBk of curBkFolder.children) {
                console.log(curBk, 'curBk')
                if (!curBk.children) {
                    curBk.index = emptyFolder.children.length
                    emptyFolder.children.push(curBk)
                }
                else {
                    bookmarks.push(curBk)
                }
            }
        }
        bookmarks.push(emptyFolder)
        console.log(bookmarks, 'bookmarks')

        return bookmarks
    }

    prepareBookmarksSetEptiFolder(bookmarksTemp) {
        //попытка сделать папку для закладок без папки
        const emptyFolder = { title: 'Пустая', id: 89898989, index: 0, children: [] }
        const bookmarks = []

        for (let curBk of bookmarksTemp) {

            if (!curBk.children) {
                curBk.index = emptyFolder.children.length
                emptyFolder.children.push(curBk)

            }
            else {
                bookmarks.push(curBk)
            }
        }
        bookmarks.push(emptyFolder)

        return bookmarks
    }

    getBookmarksFromChrome = () => {
        chrome.bookmarks.getTree(bookmarkTree => {
            console.log(bookmarkTree[0].children[0].children, 'bookmarkTree[0].children[0].children')

            const bookmarksTemp = [...bookmarkTree[0].children[0].children, ...bookmarkTree[0].children[1].children, bookmarkTree[0].children[2]]

            const bookmarks = this.prepareBookmarksSetEptiFolder(bookmarksTemp)

            //const bookmarks = this.prepareBookmarksSetEptiFolder(bookmarkTree[0].children)

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
