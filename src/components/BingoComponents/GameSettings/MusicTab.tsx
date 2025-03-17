import React from "react";
import { Playlist } from "../../../types";
import { useGameStore } from "../../../store/game";

interface MusicTabProps {
  playlists: Playlist[];
}

export const MusicTab: React.FC<MusicTabProps> = ({ playlists }) => {
  const selectedPlaylists = useGameStore((state) => state.selectedPlaylists);
  const handleSelection = useGameStore((state) => state.handleSelection);

  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <div>
          <h1 className="text-xl font-medium">
            Choose your playlist/s to create the bingo:
          </h1>
          {/* <p>Up to 5.</p> */}
        </div>

        <div className="flex p-4 overflow-y-scroll border rounded-lg xl:h-72 sm:h-64 h-52">
          <ul className="space-y-2">
            {playlists.map((playlist) => (
              <li
                className="border rounded-lg p-2 text-sm font-medium flex justify-between items-center"
                key={playlist.id}
              >
                <div className="flex justify-center items-center gap-4">
                  <img className="w-12 h-12 rounded" src={playlist.image} />
                  <label htmlFor={playlist.id}>{playlist.name}</label>
                </div>
                <input
                  type="checkbox"
                  id={playlist.id}
                  className="form-checkbox h-4 w-4"
                  onChange={() => handleSelection(playlist)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-medium">Your selection: </h2>
          <ul className="overflow-auto max-h-48">
            {Array.from(selectedPlaylists).map((playlist) => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
