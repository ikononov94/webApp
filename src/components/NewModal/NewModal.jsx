import React from 'react';
import {
  Modal, ModalHeader, Button, ModalBody, ModalFooter, ModalTitle,
} from 'react-bootstrap';

const NewModal = ({
  show, onHide, title, children, addFunction, disabled
}) => (
  <Modal show={show} onHide={onHide}>
    <ModalHeader closeButton>
      <ModalTitle>{title}</ModalTitle>
    </ModalHeader>
    <form onSubmit={(event) => {
      event.preventDefault();
      addFunction();
    }}
    >
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <Button type="submit" disabled={disabled}>Добавить</Button>
      </ModalFooter>
    </form>
  </Modal>
);

export default NewModal;
