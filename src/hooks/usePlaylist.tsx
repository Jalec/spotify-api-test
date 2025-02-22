import { useState, useEffect } from "react";
import { BingoSong, Playlist } from "../types";
import { getRandomPlaylist } from "../utils/spotifyUtil";

interface PlaylistReturn {
  playlist: null | BingoSong[];
  markSong: (index: number) => void;
}

export const usePlaylist = (
  playlists: Set<Playlist>,
  maxSongs: number
): PlaylistReturn => {
  const [playlist, setPlaylist] = useState<null | BingoSong[]>(null);
  useEffect(() => {
    const fetchRandomPlaylist = async () => {
      const data = await getRandomPlaylist(playlists, maxSongs);
      const formatPlaylist = data.map((song) => {
        return {
          song: song.track.name,
          marked: false,
          trackUri: song.track.uri,
          artists: getArtists(song.track.artists),
        };
      });

      setPlaylist(formatPlaylist);
    };
    fetchRandomPlaylist();
  }, [playlists, maxSongs]);

  const getArtists = (artists) => {
    if (artists.length === 1) {
      return artists[0].name;
    } else {
      return artists.map((artist) => artist.name).join(", ");
    }
  };
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
