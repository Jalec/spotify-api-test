import { useState, useEffect } from "react";
import { BingoSong } from "../types";
import { getPlaylistTracks } from "../utils/spotifyUtil";

interface PlaylistReturn {
  playlist: null | BingoSong[];
  markSong: (index: number) => void;
}

export const usePlaylist = (playlistID: string): PlaylistReturn => {
  const [playlist, setPlaylist] = useState<null | BingoSong[]>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlist = await getPlaylistTracks(playlistID);
      const playlistSongs = playlist.items.map((track) => {
        return {
          song: track.track.name,
          marked: false,
          trackUri: track.track.uri,
          artists: getArtists(track.track.artists),
        };
      });

      setPlaylist(playlistSongs.sort(() => Math.random() - 0.5));
    };
    fetchPlaylist();
  }, [playlistID]);

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
