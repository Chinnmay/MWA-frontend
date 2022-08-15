import { Modal, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function ModalAlert(props) {
  //props:
  // size="lg"
  //variant="danger"
  //message=""
  // resestCallback={setShowLoginAlert}
  return (
    <Modal size={props.size} show={true} onHide={() => props.resetCallback(false)}>
      <Modal.Body className="p-0" closeButton>
        <Alert variant={props.variant} className="m-0" onClose={() => props.resetCallback(false)} dismissible>
          {props.message}
        </Alert>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAlert;
