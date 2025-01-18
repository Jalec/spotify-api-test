import React from "react";
import { useNavigate } from "react-router-dom";

export const Winner = () => {
  const navigate = useNavigate();
  const playAgain = () => {
    navigate("/content");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl">YOU WON!</h1>
      <img
        className="w-64"
        src="https://img.pixers.pics/pho_wat(s3:700/FO/38/16/66/01/700_FO38166601_9311f3a5745aa4bfc3be27b43f10a88b.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/posters-3d-penguin-is-fishing.jpg.jpg"
      />

      <button
        className="bg-black text-white rounded-3xl w-1/4 h-16"
        onClick={playAgain}
      >
        PLAY AGAIN
      </button>
    </div>
  );
};
