import { Component } from 'react';
import './BkContainer.css';

import BkModal from './BkModal'
import { PREVIEW_ITEMS_LIMIT, renderBookmarkChildren } from './renderBookmarkChildren';

export default class BkContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenFolder: false
    };
  }

  setOpenFolder = () => {
    this.setState((prevState) => ({ isOpenFolder: !prevState.isOpenFolder }));
  }

  render() {
    const { title, bkFolder } = this.props;
    const renderComponent = renderBookmarkChildren(bkFolder, { limit: PREVIEW_ITEMS_LIMIT });

    return (
      <div className="contener-card">
        <>
          <div className="title" onClick={this.setOpenFolder}>
            {title}
          </div>

          <div className="bk-contener">
            {renderComponent}
          </div>
        </>

        {this.state.isOpenFolder &&
          <BkModal
            bkFolder={bkFolder}
            title={title}
            setOpenFolder={this.setOpenFolder}
            isOpenFolder={this.state.isOpenFolder}
          />
        }
      </div>
    );
  }
}
