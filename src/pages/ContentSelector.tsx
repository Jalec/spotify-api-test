import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";
import { GameSettings } from "../components/BingoComponents/GameSettings/GameSettings";
import { peepBycicle1, peepStanding1 } from "../assets/peeps/peeps";

const ContentSelector: React.FC = () => {
  const [openSettings, setOpenSettings] = React.useState<boolean>(false);
  const endGame = useGameStore((state) => state.endGame);
  const handleOpenSettings = () => {
    if (openSettings) endGame();
    setOpenSettings(!openSettings);
  };

  return (
    <main id="background" className="flex-1 flex items-center justify-center">
      {openSettings ? (
        <>
          <div className="w-full">
            <div className="fixed left-44 top-72 z-10">{peepStanding1()}</div>
            <div className="relative flex justify-center items-center z-10">
              <GameSettings handleOpenSettings={handleOpenSettings} />
            </div>
            <div className="fixed right-44 top-1/4 z-10">{peepBycicle1()}</div>
            <div className="fixed bottom-52">
              <svg
                width="100%"
                height="100"
                viewBox="0 0 2100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,81 L20,78 L40,81 L60,77 L80,80 L100,78 L120,82 L140,79 L160,81 L180,78 L200,80 L220,76 
             L240,81 L260,78 L280,80 L300,79 L320,81 L340,78 L360,80 L380,77 L400,82 L420,80 L440,78 
             L460,81 L480,79 L500,80 L520,78 L540,81 L560,77 L580,80 L600,79 L620,81 L640,78 L660,80 
             L680,77 L700,82 L720,80 L740,78 L760,81 L780,79 L800,80 L991,81 L990,82 L990,79 L7800,76 "
                  stroke="black"
                  fill="none"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div className="fixed top-20 left-1/4">
              <svg
                width="200"
                height="100"
                viewBox="0 0 200 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30,50 Q40,40 50,50 Q60,40 70,50"
                  stroke="black"
                  fill="none"
                  stroke-width="2"
                />

                <path
                  d="M120,40 Q130,30 140,40 Q150,30 160,40"
                  stroke="black"
                  fill="none"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div className="fixed top-52 right-1/4">
              <svg
                width="200"
                height="100"
                viewBox="0 0 200 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30,50 Q40,40 50,50 Q60,40 70,50"
                  stroke="black"
                  fill="none"
                  stroke-width="2"
                />

                <path
                  d="M120,40 Q130,30 140,40 Q150,30 160,40"
                  stroke="black"
                  fill="none"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-20 justify-center items-center">
            <h1 className="text-5xl">
              Welcome! Press the button to start playing.
            </h1>
            <button
              className="bg-[#1ed760] border-b-4 border-[#58a700] text-white text-5xl rounded-lg h-[100px] w-[200px] px-4 outline-none cursor-pointer transition-[filter,transform] active:brightness-110 active:border-b-0"
              onClick={handleOpenSettings}
            >
              PLAY
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default ContentSelector;
