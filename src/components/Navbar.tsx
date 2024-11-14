import React from "react";
import { redirectToSpotifyAuth } from "../utils/spotifyUtil";
import { useUserDataStore } from "../store/userData";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const userData = useUserDataStore((state) => state.userData);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/content");
  };

  return (
    <div className="flex p-4 justify-between bg-gray-200">
      <section>
        <button onClick={goHome}>
          <h1>API TEST</h1>
        </button>
      </section>
      <section>
        {userData.userImages[0].url ? (
          <button className="bg-black p-2 rounded-3xl flex justify-center items-center gap-3 pr-3">
            <img
              className="w-8 rounded-full"
              src={userData.userImages[1].url}
            />
            <p className="text-white font-semibold">{userData.userName}</p>
          </button>
        ) : (
          <button
            className="bg-yellow-400 p-2 rounded-3xl"
            onClick={redirectToSpotifyAuth}
          >
            <h2>LOGIN TO SPOTIFY</h2>
          </button>
        )}
      </section>
    </div>
  );
}

export default Navbar;
