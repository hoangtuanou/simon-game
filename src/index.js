import React, { useEffect, useReducer, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import helpers from "./helpers";
import CONSTANTS from "./constants";
import { ModalIntruction, ModalTryAgain } from "./components/Modal";
import GameBoard from "./components/GameBoard";

const initialState = {
  colorSteps: [],
  playerSteps: [],
  turn: 0,
  counter: 0,
  playerTurn: false,
  remainSteps: 0,
  status: CONSTANTS.GAME_STATUS.START,
  modalVisible: true,
  modalTryagainVisible: false
};

const ACTION = {
  SET_MODAL_VISIBLE: "SET_MODAL_VISIBLE",
  SET_PLAYER_TURN: "SET_PLAYER_TURN",
  SET_COLOR_STEPS: "SET_COLOR_STEPS",
  NEXT_PLAYER_MOVE: "NEXT_PLAYER_MOVE",
  NEXT_TURN: "NEXT_TURN",
  RESET_TO_INIT_STATE: "RESET_TO_INIT_STATE",
  PLAYER_READY: "PLAYER_READY",
  SET_TRY_AGAIN_VISIBLE: "SET_TRY_AGAIN_VISIBLE",
  SET_PLAYER_STEPS: "SET_PLAYER_STEPS"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_MODAL_VISIBLE:
      return { ...state, modalVisible: action.payload };
    case ACTION.SET_PLAYER_TURN:
      return { ...state, playerTurn: action.payload };
    case ACTION.SET_COLOR_STEPS:
      return { ...state, colorSteps: action.payload };
    case ACTION.SET_REMAINING_STEPS:
      return { ...state, remainSteps: action.payload };
    case ACTION.NEXT_PLAYER_MOVE:
      return {
        ...state,
        counter: state.counter + 1,
        remainSteps: state.remainSteps - 1
      };
    case ACTION.NEXT_TURN:
      return {
        ...state,
        playerTurn: false,
        counter: 0,
        turn: state.turn + 1,
        playerSteps: []
      };
    case ACTION.RESET_TO_INIT_STATE:
      return {
        ...state,
        playerTurn: false,
        counter: 0,
        turn: 0,
        status: CONSTANTS.GAME_STATUS.START
      };
    case ACTION.PLAYER_READY:
      return {
        ...state,
        status: CONSTANTS.GAME_STATUS.PLAYING,
        turn: state.turn + 1,
        remainSteps: state.turn + 1,
        modalVisible: false,
        modalTryagainVisible: false,
        playerSteps: []
      };
    case ACTION.SET_TRY_AGAIN_VISIBLE:
      return {
        ...state,
        modalTryagainVisible: action.payload
      };
    case ACTION.SET_PLAYER_STEPS:
      return {
        ...state,
        playerSteps: [...state.playerSteps, action.payload]
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const btnRef = useRef({});
  const {
    turn,
    remainSteps,
    modalVisible,
    colorSteps,
    counter,
    playerTurn,
    modalTryagainVisible,
    playerSteps
  } = state;

  useEffect(() => {
    dispatch({ type: ACTION.SET_REMAINING_STEPS, payload: turn });
  }, [turn]);

  useEffect(() => {
    if (colorSteps.length === turn) {
      dispatch({ type: ACTION.SET_PLAYER_TURN, payload: true });
    }
  }, [colorSteps, turn]);

  const flashButton = (step) => {
    btnRef.current[`btn-${step}`].classList.add("flash");
    setTimeout(function () {
      btnRef.current[`btn-${step}`].classList.remove("flash");
    }, 550);
  };

  const botMove = () => {
    const colorSteps = helpers.arrayWithRandomNumber(turn + 1, 0, 3);

    colorSteps.forEach((step, i) => {
      setTimeout(() => {
        flashButton(step);

        if (colorSteps.length - 1 === i) {
          dispatch({ type: ACTION.SET_COLOR_STEPS, payload: colorSteps });
        }
      }, i * 1000);
    });
  };

  const loseGame = async () => {
    const wrapper = document.getElementById("wrapper-btn");
    wrapper.classList.add("shake");
    wrapper.style.borderColor = "red";

    dispatch({ type: ACTION.RESET_TO_INIT_STATE });
    await helpers.wait(500);
    wrapper.classList.remove("shake");
    wrapper.style.borderColor = "#272932";
    dispatch({ type: ACTION.SET_TRY_AGAIN_VISIBLE, payload: true });
  };

  const playerMove = async (btnOrder) => {
    dispatch({ type: ACTION.SET_PLAYER_STEPS, payload: btnOrder });

    if (btnOrder === colorSteps[counter]) {
      if (counter !== turn - 1) {
        dispatch({ type: ACTION.NEXT_PLAYER_MOVE });
      } else {
        dispatch({ type: ACTION.NEXT_TURN });
        await helpers.wait(1500);
        botMove();
      }

      return;
    }

    loseGame();
  };

  const clickColorButton = (step) => {
    if (playerTurn) {
      flashButton(step);
      playerMove(step);
    }
  };

  const playerReady = async () => {
    dispatch({ type: ACTION.PLAYER_READY });
    await helpers.wait(1000);
    botMove();
  };

  return (
    <div className="App">
      <p className="title">Remeber color order!!!</p>
      <div className="controller">
        <div className="game-info">
          <span>Level: {turn}</span>
          <span>Counter: {remainSteps}</span>
        </div>
      </div>
      <GameBoard ref={btnRef} onClickBtn={clickColorButton} />
      {modalVisible && <ModalIntruction confirmAction={playerReady} />}
      {modalTryagainVisible && (
        <ModalTryAgain
          confirmAction={playerReady}
          colorSteps={colorSteps}
          playerSteps={playerSteps}
        />
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
