import React from "react";
import Player from "../../pages/Player";

export const BingoControls = () => {
  const callBingo = () => {
    alert("BINGO");
  };
  const callLine = () => {
    alert("LINE");
  };
  return (
    <>
      <div className="w-1/4 border-l p-4 flex flex-col gap-4 justif-center items-center">
        <h2 className="text-xl font-semibold">Controls</h2>
        <Player />
        <button
          className="bg-black text-white rounded-3xl w-3/4 h-16"
          onClick={callBingo}
        >
          BINGO
        </button>
        <button
          className="bg-black text-white rounded-3xl w-3/4 h-16"
          onClick={callLine}
        >
          LINE
        </button>
      </div>
    </>
  );
};
