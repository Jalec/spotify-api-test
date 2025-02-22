import { create } from "zustand";
import { BingoSong, GameResult, GameSettings, Playlist } from "../types";

interface Game {
  playing: boolean;
  selectedPlaylists: Set<Playlist>;
  gameSongs: BingoSong[];
  playerBoard: string[];
  markedSongs: Set<string>;
  playedSongs: Set<string>;
  currentSong: string;
  gameResult: GameResult;
  gameSettings: GameSettings;

  startGame: () => void;
  endGame: () => void;
  handleSelection: (playlist: Playlist) => void;
  setGameSongs: (playlist: BingoSong[]) => void;
  setCurrentSong: (song: BingoSong) => void;
  checkSong: (songId: string) => void;
  checkWinner: () => void;
  setMaxSongs: (key: string, maxSongs: string) => void;
  setTimePerSong: (key: string, timePerSong: number) => void;
}

export const useGameStore = create<Game>((set) => {
  return {
    playing: false,
    selectedPlaylists: new Set(),
    gameSongs: null,
    playerBoard: [],
    markedSongs: new Set(),
    playedSongs: new Set(),
    currentSong: "",
    gameResult: "TBD",
    gameSettings: {
      maxSongs: 25,
      timePerSong: 10,
    },

    startGame: () => {
      set({ playing: true });
    },

    endGame: () => {
      set({ playing: false, selectedPlaylists: new Set() });
    },

    handleSelection: (playlist: Playlist) => {
      set((state) => {
        const updatedSet = new Set(state.selectedPlaylists);
        if (updatedSet.has(playlist)) {
          updatedSet.delete(playlist); // Remove the playlist if it's already selected
        } else {
          updatedSet.add(playlist); // Add the playlist if it's not selected
        }
        return { selectedPlaylists: updatedSet };
      });
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

    setMaxSongs: (key: string, maxSongs: number) => {
      set((state) => ({
        gameSettings: {
          ...state.gameSettings,
          [key]: maxSongs,
        },
      }));
    },

    setTimePerSong: (key: string, timePerSong: number) => {
      set((state) => ({
        gameSettings: {
          ...state.gameSettings,
          [key]: timePerSong,
        },
      }));
    },
  };
});
