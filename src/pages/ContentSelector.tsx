import React, { useEffect } from "react";
import { useUserDataStore } from "../store/userData";
import { useNavigate } from "react-router-dom";

function ContentSelector() {
  const userData = useUserDataStore((state) => state.userData);
  const navigate = useNavigate();

  const goToTopTracks = () => {
    navigate("/toptracks");
  };

  const goToPlayer = () => {
    navigate("/player");
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
        onClick={goToTopTracks}
      >
        See my playlists
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
}

export default ContentSelector;
