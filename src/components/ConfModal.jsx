import { Modal, Button } from 'react-bootstrap';
const ConfModal = ({ show, onHide, content }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{content.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={content.confirmAction}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ConfModal;