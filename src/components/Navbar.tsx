import React from "react";
import { redirectToSpotifyAuth } from "../utils/spotifyUtil";
import { useUserDataStore } from "../store/userData";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const userData = useUserDataStore((state) => state.userData);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/content");
  };

  return (
    <div className="flex p-4 justify-between bg-gray-200">
      <section>
        <button onClick={goHome}>
          <h1 className="flex p-0 m-0 items-center text-2xl">MUSICAL BINGO</h1>
        </button>
      </section>
      <section>
        {userData.userImages[0].url ? (
          <button className="bg-black rounded-full flex justify-center items-center gap-3 px-5 py-2">
            <img
              className="w-8 rounded-full"
              src={userData.userImages[1].url}
            />
            <p className="text-white font-semibold">{userData.userName}</p>
          </button>
        ) : (
          <button
            onClick={redirectToSpotifyAuth}
            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 font-semibold"
          >
            Connect with Spotify
          </button>
        )}
      </section>
    </div>
  );
};

export default Navbar;
