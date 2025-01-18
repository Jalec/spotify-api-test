import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";
import { GameSettings } from "../components/BingoComponents/GameSettings/GameSettings";

const ContentSelector: React.FC = () => {
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);

  const handleOpenSettings = () => {
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
              className="rounded-xl bg-black text-white p-2 w-64"
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
