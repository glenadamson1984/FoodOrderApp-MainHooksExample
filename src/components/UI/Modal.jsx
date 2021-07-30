import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = ({ onClose }) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      BackDrop
    </div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
