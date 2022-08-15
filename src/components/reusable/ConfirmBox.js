import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function ConfirmBox(props) {
  return (
    <Modal show={true} onHide={() => props.resetCallback(false)}>
      <Modal.Header style={{ backgroundColor: "#2d543e", color: "white" }}>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.message}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          style={{ color: "white", textAlign: "center" }}
          onClick={() => {
            props.confirmAction();
            props.resetCallback(false);
          }}
        >
          Confirm
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            props.resetCallback(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmBox;
