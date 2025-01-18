import React from "react";
import { redirectToSpotifyAuth } from "../utils/spotifyUtil";
import { useUserDataStore } from "../store/userData";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const userData = useUserDataStore((state) => state.userData);
  const isAuthenticated = useUserDataStore((state) => state.isAuthenticated);
  const fetchUserData = useUserDataStore((state) => state.fetchUserData);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/content");
  };

  const logIn = async () => {
    redirectToSpotifyAuth();
  };

  return (
    <div className="flex p-4 justify-between border">
      <section className="flex items-center justify-center ">
        <button onClick={goHome}>
          <h1 className="flex p-0 m-0 items-center justify-center text-2xl font-dynapuff">
            BINGO BOOGIE
          </h1>
        </button>
      </section>
      <section>
        {isAuthenticated ? (
          <button className="bg-black rounded-full flex justify-center items-center gap-3 px-5 py-2">
            <img
              className="w-8 rounded-full"
              src={userData.userImages[1].url}
            />
            <p className="text-white font-semibold">{userData.userName}</p>
          </button>
        ) : (
          <button
            onClick={logIn}
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
