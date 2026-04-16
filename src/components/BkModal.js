import Modal from 'react-bootstrap/Modal'

import './BkModal.css';
import { renderBookmarkChildren } from './renderBookmarkChildren';

export default function BkModal(props) {
  const {
    title,
    bkFolder,
    setOpenFolder,
    isOpenFolder
  } = props;
  const renderComponent = renderBookmarkChildren(bkFolder);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isOpenFolder}
      onHide={setOpenFolder}
      animation
    >
      <Modal.Header closeButton>
        {title}
      </Modal.Header>
      <Modal.Body>
        <div className="bk-open-folder">
          {renderComponent}
        </div>
      </Modal.Body>
    </Modal>
  );
}
