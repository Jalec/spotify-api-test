import React from "react";
import { redirectToSpotifyAuth } from "../utils/spotifyUtil";

const Default: React.FC = () => {
  const logIn = () => {
    redirectToSpotifyAuth();
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-5">
        <p className="text-4xl">Connect with Spotify to start playing!</p>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 font-semibold"
          onClick={logIn}
        >
          Connect with Spotify
        </button>
      </div>
    </>
  );
};

export default Default;
