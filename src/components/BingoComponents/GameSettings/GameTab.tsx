import React, { useState } from "react";
import { Dropdown } from "./Dropdown";
import { useGameStore } from "../../../store/game";

const timeOptions = {
  "10 - Normal": 10,
  "5 - Difficult": 5,
  "3 - Extreme": 3,
};

export const GameTab: React.FC = () => {
  const saveMaxSongs = useGameStore((state) => state.setMaxSongs);
  const saveTimePerSong = useGameStore((state) => state.setTimePerSong);
  const defaultTimePerSong = useGameStore(
    (state) => state.gameSettings.timePerSong
  );
  const defaultMaxSongs = useGameStore((state) => state.gameSettings.maxSongs);
  const [maxSongs, setMaxSongs] = useState<number>(25);
  const [error, setError] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(true);
  const [selectedTimeOption, setSelectedTimeOption] =
    useState<string>("10 - Normal");

  const handleSelectTimeOption = (timeOption: string) => {
    setSave(true);
    setSelectedTimeOption(timeOption);
  };

  const handleMaxSongs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSave(true);
    const { value } = e.target;
    const numericValue = parseInt(value);

    if (isNaN(numericValue) || numericValue > 25 || numericValue < 1) {
      setError(true);
    } else {
      setError(false);
      setMaxSongs(numericValue);
    }
  };

  const saveSettings = () => {
    setSave(false);
    saveMaxSongs("maxSongs", maxSongs);
    saveTimePerSong("timePerSong", timeOptions[selectedTimeOption]);
  };

  const getDefaultTimePerSong = () => {
    return Object.keys(timeOptions).find(
      (option) => timeOptions[option] === defaultTimePerSong
    );
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Time per Song Section */}
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          Select Time per Song
        </label>
        <Dropdown
          options={timeOptions}
          selectedValue={getDefaultTimePerSong}
          handleSelect={handleSelectTimeOption}
        />
      </div>

      {/* Board Size Section */}
      <div className="space-y-2">
        <label className="block text-lg font-medium text-gray-700">
          Select the Size of the Board
        </label>
        <p className="text-sm text-gray-500">1-25 (Recommended: 25)</p>
        <input
          type="number"
          className={`w-20 px-3 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          min="1"
          max="25"
          defaultValue={defaultMaxSongs}
          onChange={handleMaxSongs}
          aria-invalid={error}
          aria-describedby="maxSongsError"
        />
        {error && (
          <p id="maxSongsError" className="text-sm text-red-600">
            The size must be between 1 and 25.
          </p>
        )}
      </div>

      <button
        onClick={saveSettings}
        disabled={!save}
        className={`${
          !error && save ? "bg-[#1ed760]" : "bg-gray-200"
        } border-b-4 border-[#58a700] text-white text-xl rounded-lg h-[50px] w-[100px] px-4 outline-none cursor-pointer transition-[filter,transform] active:brightness-110 active:border-b-0`}
      >
        SAVE
      </button>
    </div>
  );
};
