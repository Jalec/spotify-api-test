import React from "react";
import { useNavigate } from "react-router-dom";

export const Loser = () => {
  const navigate = useNavigate();
  const playAgain = () => {
    navigate("/content");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <h1 className="text-5xl">YOU LOST!</h1>
      <img
        className="w-64"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/d7eb8e91657337.5e4bb5d1a4ffa.jpg"
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
