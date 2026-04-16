import BkFolder from './BkFolder';
import BkItem from './BkItem';

export const PREVIEW_ITEMS_LIMIT = 4;

export function renderBookmarkChildren(bookmarkFolder, options = {}) {
  const { limit } = options;
  const hasLimit = Number.isInteger(limit) && limit > 0;
  const bookmarkChildren = bookmarkFolder && Array.isArray(bookmarkFolder.children)
    ? bookmarkFolder.children
    : [];
  const visibleChildren = hasLimit ? bookmarkChildren.slice(0, limit) : bookmarkChildren;

  return visibleChildren.map((currentBk, index) => {
    const key = currentBk && currentBk.id
      ? currentBk.id
      : `${bookmarkFolder && bookmarkFolder.id ? bookmarkFolder.id : 'bookmark'}-${index}`;
    const title = currentBk && currentBk.title ? currentBk.title : 'Без названия';

    if (currentBk && Array.isArray(currentBk.children)) {
      return (
        <BkFolder
          key={key}
          currentBk={currentBk}
          title={title}
        />
      );
    }

    return (
      <BkItem
        key={key}
        title={title}
        currentBk={currentBk}
      />
    );
  });
}
