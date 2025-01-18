import { create } from "zustand";
import { BingoSong, GameResult } from "../types";

interface Game {
  playing: boolean;
  gameSongs: BingoSong[];
  playerBoard: string[];
  markedSongs: Set<string>;
  playedSongs: Set<string>;
  currentSong: string;
  gameResult: GameResult;

  startGame: () => void;
  endGame: () => void;
  setGameSongs: (playlist: BingoSong[]) => void;
  setCurrentSong: (song: BingoSong) => void;
  checkSong: (songId: string) => void;
  checkWinner: () => void;
}

export const useGameStore = create<Game>((set) => {
  return {
    playing: false,
    gameSongs: null,
    playerBoard: [],
    markedSongs: new Set(),
    playedSongs: new Set(),
    currentSong: "",
    gameResult: "TBD",

    startGame: () => {
      set({ playing: true });
    },

    endGame: () => {
      set({ playing: false });
    },

    setGameSongs: (playlist: BingoSong[]) => {
      set({ gameSongs: playlist });
    },

    setCurrentSong: (song: BingoSong) => {
      set({ currentSong: song.trackUri });
    },

    checkSong: (songId: string) => {
      set((state) => {
        if (songId === state.currentSong) {
          const updatedMarkedSongs = new Set(state.markedSongs);
          updatedMarkedSongs.add(songId);

          return { markedSongs: updatedMarkedSongs };
        }
        state.endGame();
        return { gameResult: "LOST" };
      });
    },

    checkWinner: () => {
      set((state) => {
        if (state.markedSongs.size === state.gameSongs.length) {
          return { playing: false, gameResult: "WON" };
        }

        return { playing: false, gameResult: "LOST" };
      });
    },
  };
});
