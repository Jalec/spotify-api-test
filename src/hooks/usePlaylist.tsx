import { useState, useEffect } from "react";
import { BingoSong } from "../types";
import { getPlaylistTracks } from "../utils/spotifyUtil";
import { animate, stagger } from "motion";

interface PlaylistReturn {
  playlist: null | BingoSong[];
  markSong: (index: number) => void;
}

export const usePlaylist = (playlistID: string): PlaylistReturn => {
  const [playlist, setPlaylist] = useState<null | BingoSong[]>(null);
  const [isInitialLoad, setIsInitalLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlist = await getPlaylistTracks(playlistID);
      const playlistSongs = playlist.items.map((track) => {
        return {
          song: track.track.name,
          marked: false,
        };
      });
      setPlaylist(playlistSongs);
    };
    fetchPlaylist();
  }, [playlistID]);

  useEffect(() => {
    if (playlist && isInitialLoad) {
      animate("li", { opacity: 1, y: [50, 0] }, { delay: stagger(0.05) });
      setIsInitalLoad(false);
    }
  }, [playlist, isInitialLoad]);

  const markSong = (index: number) => {
    setPlaylist((prevPlaylist) => {
      if (!prevPlaylist) return null;
      return prevPlaylist.map((track, i) => {
        if (i === index) {
          return { ...track, marked: !track.marked };
        }
        return track;
      });
    });
  };

  return { playlist, markSong };
};
