import React from 'react'
import { Modal } from 'react-bootstrap'
import './AlertModal.css'

function AlertModal(props) {
  const { show, onClose, type, info } = props;

  return (
    <div>
      <Modal show={show} onHide={onClose} className={`${type}-modal`}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <p>{info}</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AlertModal
