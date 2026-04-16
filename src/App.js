import { Component } from 'react';
import './App.css';
import BkContainer from './components/BkContainer';
import { normalizeBookmarksForGrid } from './bookmarkUtils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bookmarks: [],
      isLoaded: false
    };
  }

  componentDidMount = () => {
    this.getBookmarksFromChrome();
  }

  getBookmarksFromChrome = () => {
    chrome.bookmarks.getTree((bookmarkTree) => {
      const bookmarks = normalizeBookmarksForGrid(bookmarkTree);
      this.setState({
        bookmarks,
        isLoaded: true
      });
    });
  }

  render() {
    const { bookmarks, isLoaded } = this.state;

    if (!isLoaded) {
      return 'Загрузка закладок...';
    }

    if (bookmarks.length === 0) {
      return 'Закладки не найдены.';
    }

    return (
      <div className="bk-flex-contener">
        <div className="bk-main-contener">
          {bookmarks.map((currentBk) => (
            <BkContainer
              key={currentBk.id}
              bkFolder={currentBk}
              title={currentBk.title}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
