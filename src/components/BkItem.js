import React from 'react';
import './BkItem.css';

export default class BkItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.actionClickBk = this.actionClickBk.bind(this);
  }

  getClassColorFromId(currentBk) {
    const defaultStyles = { backgroundColor: 'var(--bg-color0)' };

    if (!currentBk || !currentBk.id) {
      return defaultStyles;
    }

    const colorInd = String(currentBk.id).slice(-1);
    return { backgroundColor: `var(--bg-color${colorInd})` };
  }

  cutTitle(title) {
    return title.substring(0, 40);
  }

  isSupportedBookmarkUrl(url) {
    if (typeof url !== 'string' || url.trim().length === 0) {
      return false;
    }

    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }

  actionClickBk(url, evt) {
    evt.preventDefault();

    if (!this.isSupportedBookmarkUrl(url)) {
      return;
    }

    window.location.assign(url);
  }

  render() {
    const { currentBk, title } = this.props;
    const bookmarkUrl = currentBk && currentBk.url ? currentBk.url : '';
    const style = this.getClassColorFromId(currentBk);
    const isClickable = this.isSupportedBookmarkUrl(bookmarkUrl);
    const className = isClickable ? 'bk-item' : 'bk-item bk-item-disabled';

    return (
      <div
        className={className}
        style={style}
        onClick={(evt) => this.actionClickBk(bookmarkUrl, evt)}
        role="button"
        tabIndex={isClickable ? 0 : -1}
      >
        {this.cutTitle(title)}
      </div>
    );
  }
}