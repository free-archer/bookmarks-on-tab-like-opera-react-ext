const EMPTY_FOLDER_ID = 'empty-folder';
const EMPTY_FOLDER_TITLE = 'Без папки';

function isFolderNode(bookmarkNode) {
  return bookmarkNode && Array.isArray(bookmarkNode.children);
}

function normalizeFolderCollection(rootChildren) {
  const folderNodes = [];
  const looseBookmarks = [];

  for (const rootNode of rootChildren) {
    const childNodes = isFolderNode(rootNode) ? rootNode.children : [];

    for (const childNode of childNodes) {
      if (isFolderNode(childNode)) {
        folderNodes.push(childNode);
      } else if (childNode && childNode.url) {
        looseBookmarks.push(childNode);
      }
    }
  }

  if (looseBookmarks.length > 0) {
    folderNodes.push({
      title: EMPTY_FOLDER_TITLE,
      id: EMPTY_FOLDER_ID,
      index: folderNodes.length,
      children: looseBookmarks.map((bookmarkNode, index) => ({
        ...bookmarkNode,
        index
      }))
    });
  }

  return folderNodes;
}

export function normalizeBookmarksForGrid(bookmarkTree) {
  const rootNode = Array.isArray(bookmarkTree) ? bookmarkTree[0] : null;
  const rootChildren = isFolderNode(rootNode) ? rootNode.children : [];

  if (rootChildren.length === 0) {
    return [];
  }

  return normalizeFolderCollection(rootChildren);
}
