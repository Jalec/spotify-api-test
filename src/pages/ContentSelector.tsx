import React from "react";
import { useNavigate } from "react-router-dom";

const ContentSelector: React.FC = () => {
  const navigate = useNavigate();

  const goToTopTracks = () => {
    navigate("/toptracks");
  };

  const goToPlayer = () => {
    navigate("/player");
  };

  const goToBingo = () => {
    navigate("/bingo");
  };

  return (
    <div className="flex justify-evenly items-center gap-3">
      <button
        className="rounded-3xl bg-black text-white p-2"
        onClick={goToTopTracks}
      >
        Go to Top 5 Tracks
      </button>
      <button
        className="rounded-3xl bg-black text-white p-2"
        onClick={goToBingo}
      >
        BINGO
      </button>
      <button
        className="rounded-3xl bg-black text-white p-2"
        onClick={goToPlayer}
      >
        Music Player
      </button>
      <button
        className="rounded-3xl bg-black text-white p-2"
        onClick={goToTopTracks}
      >
        Go to Top 5 Tracks
      </button>
    </div>
  );
};

export default ContentSelector;
