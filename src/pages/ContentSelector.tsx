import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";

const ContentSelector: React.FC = () => {
  const navigate = useNavigate();
  const startGame = useGameStore((state) => state.startGame);

  const goToPlayer = () => {
    navigate("/player");
  };

  const goToBingo = () => {
    startGame();
    navigate("/bingo");
  };

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex gap-3">
        <button
          className="rounded-xl bg-black text-white p-2"
          onClick={goToBingo}
        >
          Singleplayer
        </button>
        <button
          className="rounded-xl bg-black text-white p-2"
          onClick={goToPlayer}
        >
          Multiplayer (Music player)
        </button>
      </div>
    </main>
  );
};

export default ContentSelector;
