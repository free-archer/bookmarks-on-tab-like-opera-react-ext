import { Component } from 'react';
import './App.css';
import BkContainer from './components/BkContainer';
import { normalizeBookmarksForGrid } from './bookmarkUtils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bookmarks: [],
      isLoaded: false,
      searchQuery: ''
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

  updateSearchQuery = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  includesQuery = (value, normalizedQuery) => {
    if (typeof value !== 'string') {
      return false;
    }

    return value.toLowerCase().includes(normalizedQuery);
  }

  filterBookmarkNode = (bookmarkNode, normalizedQuery) => {
    if (!bookmarkNode || typeof bookmarkNode !== 'object') {
      return null;
    }

    const hasChildren = Array.isArray(bookmarkNode.children);
    const matchesTitle = this.includesQuery(bookmarkNode.title, normalizedQuery);
    const matchesUrl = this.includesQuery(bookmarkNode.url, normalizedQuery);

    if (!hasChildren) {
      return matchesTitle || matchesUrl ? bookmarkNode : null;
    }

    if (matchesTitle) {
      return bookmarkNode;
    }

    const filteredChildren = bookmarkNode.children
      .map((childBookmark) => this.filterBookmarkNode(childBookmark, normalizedQuery))
      .filter(Boolean);

    if (filteredChildren.length === 0) {
      return null;
    }

    return {
      ...bookmarkNode,
      children: filteredChildren
    };
  }

  getVisibleBookmarks = (bookmarks, searchQuery) => {
    const normalizedQuery = typeof searchQuery === 'string'
      ? searchQuery.trim().toLowerCase()
      : '';

    if (!normalizedQuery) {
      return bookmarks;
    }

    return bookmarks
      .map((bookmarkFolder) => this.filterBookmarkNode(bookmarkFolder, normalizedQuery))
      .filter(Boolean);
  }

  render() {
    const { bookmarks, isLoaded, searchQuery } = this.state;
    const visibleBookmarks = this.getVisibleBookmarks(bookmarks, searchQuery);

    if (!isLoaded) {
      return 'Загрузка закладок...';
    }

    if (bookmarks.length === 0) {
      return 'Закладки не найдены.';
    }

    return (
      <div className="bk-flex-contener">
        <div className="bk-content-contener">
          <div className="bk-search-contener">
            <input
              className="bk-search-input"
              type="search"
              value={searchQuery}
              onChange={this.updateSearchQuery}
              placeholder="Поиск по закладкам и URL"
              aria-label="Поиск закладок"
            />
          </div>

          {visibleBookmarks.length === 0
            ? <div className="bk-empty-search">Ничего не найдено по вашему запросу.</div>
            : (
              <div className="bk-main-contener">
                {visibleBookmarks.map((currentBk) => (
                  <BkContainer
                    key={currentBk.id}
                    bkFolder={currentBk}
                    title={currentBk.title}
                  />
                ))}
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default App;
