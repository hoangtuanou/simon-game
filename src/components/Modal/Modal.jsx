import { createPortal } from "react-dom";

import "./modal.scss";

const Modal = (props) => {
  const { children } = props;
  return createPortal(
    <div className="modal-wrapper">
      <div className="modal-overlay"></div>
      <div className="modal-inner">{children}</div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
