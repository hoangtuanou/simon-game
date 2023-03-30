import { forwardRef } from "react";

import CONSTANTS from "../../constants";

const GameBoard = forwardRef(({ onClickBtn }, ref) => {
  return (
    <div className="container" id="wrapper-btn">
      {CONSTANTS.STEP_COLORS.map((color, i) => (
        <div
          key={i}
          id={i}
          className="gameBtn green"
          style={{ backgroundColor: color }}
          onClick={() => onClickBtn(i)}
          ref={(el) => (ref.current[`btn-${i}`] = el)}
        />
      ))}
    </div>
  );
});

export default GameBoard;
