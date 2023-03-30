import Modal from "./Modal";
import CONSTANTS from "../../constants";

const ColorList = ({ title, colors }) => (
  <div className="title-wrapper">
    <h3>{title}</h3>
    {colors.map((idx) => (
      <div
        className="title"
        style={{ backgroundColor: CONSTANTS.STEP_COLORS[idx] }}
      ></div>
    ))}
  </div>
);

const ModalTryAgain = ({ confirmAction, colorSteps, playerSteps }) => {
  return (
    <Modal>
      <div className="result">
        <ColorList title="Answer" colors={colorSteps} />
        <ColorList title="Your moves" colors={playerSteps} />
      </div>
      <button type="button" className="try-again-btn" onClick={confirmAction}>
        try again
      </button>
    </Modal>
  );
};

export default ModalTryAgain;
