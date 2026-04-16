import { Component } from 'react';
import './App.css';
import BkContainer from './components/BkContainer';
import SettingsModal from './components/SettingsModal';
import { normalizeBookmarksForGrid } from './bookmarkUtils';

const SETTINGS_STORAGE_KEY = 'uiSettings';

const UI_SETTINGS_LIMITS = {
  tileSize: { min: 64, max: 220 },
  tileTextSize: { min: 10, max: 32 },
  titleSize: { min: 12, max: 36 }
};

const DEFAULT_UI_SETTINGS = {
  tileSize: 120,
  tileTextSize: 15,
  titleSize: 16
};

const clampSetting = (value, { min, max }, fallback) => {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return fallback;
  }

  const roundedValue = Math.round(parsedValue);
  return Math.min(max, Math.max(min, roundedValue));
};

const normalizeUiSettings = (settings = {}) => ({
  tileSize: clampSetting(
    settings.tileSize,
    UI_SETTINGS_LIMITS.tileSize,
    DEFAULT_UI_SETTINGS.tileSize
  ),
  tileTextSize: clampSetting(
    settings.tileTextSize,
    UI_SETTINGS_LIMITS.tileTextSize,
    DEFAULT_UI_SETTINGS.tileTextSize
  ),
  titleSize: clampSetting(
    settings.titleSize,
    UI_SETTINGS_LIMITS.titleSize,
    DEFAULT_UI_SETTINGS.titleSize
  )
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      bookmarks: [],
      isLoaded: false,
      searchQuery: '',
      isSettingsOpen: false,
      uiSettings: { ...DEFAULT_UI_SETTINGS }
    };
  }

  componentDidMount = () => {
    this.getBookmarksFromChrome();
    this.loadUiSettings();
  }

  getChromeStorageLocal = () => {
    if (
      typeof chrome === 'undefined'
      || !chrome.storage
      || !chrome.storage.local
    ) {
      return null;
    }

    return chrome.storage.local;
  }

  loadUiSettings = () => {
    const storage = this.getChromeStorageLocal();

    if (!storage) {
      return;
    }

    storage.get([SETTINGS_STORAGE_KEY], (result) => {
      if (chrome.runtime && chrome.runtime.lastError) {
        return;
      }

      const savedSettings = result ? result[SETTINGS_STORAGE_KEY] : null;
      this.setState({ uiSettings: normalizeUiSettings(savedSettings) });
    });
  }

  saveUiSettings = (nextSettings) => {
    const normalizedSettings = normalizeUiSettings(nextSettings);
    this.setState({
      uiSettings: normalizedSettings,
      isSettingsOpen: false
    });

    const storage = this.getChromeStorageLocal();

    if (!storage) {
      return;
    }

    storage.set({ [SETTINGS_STORAGE_KEY]: normalizedSettings }, () => {
      if (chrome.runtime && chrome.runtime.lastError) {
        return;
      }
    });
  }

  openSettingsModal = () => {
    this.setState({ isSettingsOpen: true });
  }

  closeSettingsModal = () => {
    this.setState({ isSettingsOpen: false });
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
    const {
      bookmarks,
      isLoaded,
      searchQuery,
      isSettingsOpen,
      uiSettings
    } = this.state;
    const visibleBookmarks = this.getVisibleBookmarks(bookmarks, searchQuery);
    const uiVariables = {
      '--tile-size': `${uiSettings.tileSize}px`,
      '--width-bk': `${uiSettings.tileSize}px`,
      '--heght-bk': `${uiSettings.tileSize}px`,
      '--height-bk': `${uiSettings.tileSize}px`,
      '--bk-item-font-size': `${uiSettings.tileTextSize}px`,
      '--bk-title-font-size': `${uiSettings.titleSize}px`
    };

    if (!isLoaded) {
      return 'Загрузка закладок...';
    }

    if (bookmarks.length === 0) {
      return 'Закладки не найдены.';
    }

    return (
      <div className="bk-flex-contener" style={uiVariables}>
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

            <button
              type="button"
              className="bk-settings-button"
              onClick={this.openSettingsModal}
              aria-label="Открыть настройки отображения"
              title="Настройки"
            >
              <span className="bk-settings-button__icon" aria-hidden="true">⚙</span>
            </button>
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

          <SettingsModal
            isOpen={isSettingsOpen}
            settings={uiSettings}
            limits={UI_SETTINGS_LIMITS}
            onClose={this.closeSettingsModal}
            onSave={this.saveUiSettings}
          />
        </div>
      </div>
    );
  }
}

export default App;
