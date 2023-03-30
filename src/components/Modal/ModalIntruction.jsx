import Modal from "./Modal";

const ModalIntruction = ({ confirmAction }) => {
  return (
    <Modal>
      <h3>How To Play</h3>
      <p>
        Memorize the blinking titles then tap them in their orders to pass
        level.
      </p>
      <button type="button" onClick={confirmAction}>
        ready
      </button>
    </Modal>
  );
};

export default ModalIntruction;
