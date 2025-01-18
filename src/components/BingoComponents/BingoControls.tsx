import React, { useState } from "react";
import Player from "../../pages/Player";
import { useGameStore } from "../../store/game";

export const BingoControls = () => {
  const gameSongs = useGameStore((state) => state.gameSongs);
  const endGame = useGameStore((state) => state.endGame);
  const [playMusic, setPlayMusic] = useState<boolean>(false);
  const startGame = () => {
    if (gameSongs) {
      console.log(gameSongs);

      setPlayMusic(true);
    }
  };
  const callFinish = () => {
    endGame();
  };

  return (
    <>
      <div className="w-1/4 border-l p-4 flex flex-col gap-4 justif-center items-center">
        <h2 className="text-xl font-semibold">Controls</h2>
        <Player playMusic={playMusic} />
        <button
          className="bg-black text-white rounded-3xl w-3/4 h-16"
          onClick={startGame}
        >
          START
        </button>
        <button
          className="bg-black text-white rounded-3xl w-3/4 h-16"
          onClick={callFinish}
        >
          FINISH
        </button>
      </div>
    </>
  );
};
