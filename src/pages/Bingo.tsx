import { motion } from "framer-motion";
import { BingoSong } from "../types";
import { usePlaylist } from "../hooks/usePlaylist";
import { useState, useEffect } from "react";

const playlistID = "3aviIfdgBAwUeZ4cDdQ0zK";

export const Bingo = () => {
  const { playlist, markSong } = usePlaylist(playlistID);

  return (
    <div>
      <ul className="flex gap-10 justify-center flex-wrap">
        {playlist &&
          playlist.map((track: BingoSong, index: number) => (
            <motion.li
              key={index}
              className={`flex justify-center items-center w-32 h-32 rounded-xl border opacity-0 p-8 hover:cursor-pointer ${
                track.marked ? "bg-black text-white" : ""
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => markSong(index)}
            >
              {track.song}
            </motion.li>
          ))}
      </ul>
    </div>
  );
};
