import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AuthModal = (props) => {
  return (
    <>
      <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.messageTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.messageContent}
          </ModalBody>
          <ModalFooter>
            <Link to={props.link}>
                <Button onClick={props.onClose}>{props.closeCaption}</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
