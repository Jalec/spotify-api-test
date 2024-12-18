import React from "react";
import { useUserDataStore } from "../store/userData";

const Default: React.FC = () => {
  const fetchUserData = useUserDataStore((state) => state.fetchUserData);
  const rebreInfo = async () => {
    await fetchUserData();
  };
  return (
    <>
      <div>
        <p className="text-4xl">Log in to Spotify to Start!</p>
        <button className="bg-black text-white" onClick={rebreInfo}>
          click me!
        </button>
      </div>
    </>
  );
};

export default Default;
