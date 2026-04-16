import { Component } from 'react';
import './BkFolder.css';

import BkModal from './BkModal'

export default class BkFolder extends Component {
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
    const { title, currentBk } = this.props;

    return (
      <>
        <div
          className="bk-folder"
          onClick={this.setOpenFolder}
        >
          <span className="bk-folder__icon" aria-hidden="true">
            <span className="bk-folder__icon-top" />
            <span className="bk-folder__icon-body" />
          </span>
          <span className="bk-folder__title">{title}</span>
        </div>

        {this.state.isOpenFolder &&
          <BkModal
            bkFolder={currentBk}
            title={title}
            setOpenFolder={this.setOpenFolder}
            isOpenFolder={this.state.isOpenFolder}
          />
        }
      </>
    );
  }
}