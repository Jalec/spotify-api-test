import React, { useState } from "react";
import Player from "../../pages/Player";
import { useGameStore } from "../../store/game";

interface BingoControlsProps {
  checkEndGame: () => void;
}

export const BingoControls: React.FC<BingoControlsProps> = ({
  checkEndGame,
}) => {
  const gameSongs = useGameStore((state) => state.gameSongs);
  const endGame = useGameStore((state) => state.endGame);
  const selectedPlaylists = useGameStore((state) => state.selectedPlaylists);
  const [playMusic, setPlayMusic] = useState<boolean>(false);
  const startGame = () => {
    if (gameSongs) {
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
        <Player playMusic={playMusic} checkEndGame={checkEndGame} />
        {!playMusic && (
          <button
            className="bg-black text-white rounded-3xl w-3/4 h-16"
            onClick={startGame}
          >
            START
          </button>
        )}
        {playMusic && (
          <button
            className="bg-black text-white rounded-3xl w-3/4 h-16"
            onClick={callFinish}
          >
            FINISH
          </button>
        )}
        <section>
          <h1>Your playlist selection: </h1>
          <ul>
            {Array.from(selectedPlaylists).map((playlist, index) => (
              <li key={index}>{playlist.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};
