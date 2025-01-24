import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";
import { GameSettings } from "../components/BingoComponents/GameSettings/GameSettings";

const ContentSelector: React.FC = () => {
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const endGame = useGameStore((state) => state.endGame);
  const handleOpenSettings = () => {
    if (openSettings) endGame();
    setOpenSettings(!openSettings);
  };

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-20 justify-center items-center">
        {openSettings ? (
          <GameSettings handleOpenSettings={handleOpenSettings} />
        ) : (
          <>
            <h1 className="text-5xl">
              Welcome! Press the button to start playing.
            </h1>
            <button
              className="bg-[#1ed760] border-b-4 border-[#58a700] text-white rounded-lg h-[50px] px-4 outline-none cursor-pointer transition-[filter,transform] active:brightness-110 active:border-b-0"
              onClick={handleOpenSettings}
            >
              PLAY
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default ContentSelector;
