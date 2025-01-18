import React, { useState, useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { BingoSong } from "../types";
import { usePlaylist } from "../hooks/usePlaylist";
import { BingoTile } from "../components/BingoComponents/BingoTile";
import { BingoControls } from "../components/BingoComponents/BingoControls";
import { useGameStore } from "../store/game";
import { Loser } from "./EndGame/Loser";
import { Winner } from "./EndGame/Winner";

const PLAYLIST_ID = "3IKoeFHKUdvxDKpZFZB69k";
const BOARD_SIZE = 25;
const GRID_SIZE = 5;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
      when: "beforeChildren",
    },
  },
};

const generateRandomSongs = (
  playlist: BingoSong[],
  count: number = BOARD_SIZE
): BingoSong[] => {
  const tempPlaylist = [...playlist];
  const selectedSongs: BingoSong[] = [];

  while (selectedSongs.length < count && tempPlaylist.length > 0) {
    const randomIndex = Math.floor(Math.random() * tempPlaylist.length);
    const [song] = tempPlaylist.splice(randomIndex, 1);
    selectedSongs.push(song);
  }

  return selectedSongs;
};

export const Bingo = () => {
  const { playlist, markSong } = usePlaylist(PLAYLIST_ID);
  const [board, setBoard] = useState<BingoSong[]>([]);

  // Game state
  const playing = useGameStore((state) => state.playing);
  const gameResult = useGameStore((state) => state.gameResult);
  const setGameSongs = useGameStore((state) => state.setGameSongs);
  const checkSong = useGameStore((state) => state.checkSong);
  const checkWinner = useGameStore((state) => state.checkWinner);

  useEffect(() => {
    if (playlist && board.length === 0) {
      const randomSongs = generateRandomSongs(playlist);
      setGameSongs(randomSongs);
      setBoard(generateRandomSongs(randomSongs));
    }
  }, [playlist]);

  const handleTileClick = (index: number, song: BingoSong) => {
    checkSong(song.trackUri);
    markSong(index);
    setBoard((prevBoard) =>
      prevBoard.map((song, i) =>
        i === index ? { ...song, marked: !song.marked } : song
      )
    );
  };

  const checkEndGame = () => {
    checkWinner();
  };

  if (!playlist) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Building Bingo Cardboard...</p>
      </div>
    );
  }

  return (
    <>
      {!playing ? (
        <>
          {gameResult === "LOST" ? (
            <Loser />
          ) : gameResult === "WON" ? (
            <Winner />
          ) : (
            <div>loading...</div>
          )}
        </>
      ) : (
        <div className="flex-1 flex gap-4 ">
          <main className="flex-1 flex p-8 justify-center">
            <motion.ul
              className={`grid w-3/4 grid-cols-5 gap-4 place-items-center`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {board.map((track: BingoSong, index: number) => (
                <BingoTile
                  key={`${track.song}-${index}`}
                  song={track.song}
                  artists={track.artists}
                  marked={track.marked}
                  onClick={() => handleTileClick(index, track)}
                />
              ))}
            </motion.ul>
          </main>
          <BingoControls checkEndGame={checkEndGame} />
        </div>
      )}
    </>
  );
};

export default Bingo;
