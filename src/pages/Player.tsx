import React, { useEffect, useState } from "react";
import {
  getToken,
  playTrack,
  transferPlaybackToDevice,
} from "../utils/playerUtils";
import { useGameStore } from "../store/game";
import { BingoSong } from "../types";
interface PlayerProps {
  playMusic: boolean;
  checkEndGame: () => void;
}

const Player: React.FC<PlayerProps> = ({ playMusic, checkEndGame }) => {
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [songTracker, setSongTracker] = useState<number>(1);

  // Game state
  const gameSongs = useGameStore((state) => state.gameSongs);
  const setCurrentSong = useGameStore((state) => state.setCurrentSong);
  const playing = useGameStore((state) => state.playing);
  const timePerSong = useGameStore((state) => state.gameSettings.timePerSong);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "BingoBoogie Music Player",
        getOAuthToken: async (cb) => {
          try {
            const token = await getToken();

            if (!token) throw new Error("Token not found in cookies");
            cb(token.token);
          } catch (error) {
            console.error("Error retrieving Spotify token:", error);
          }
        },
        volume: 0.5,
      });

      spotifyPlayer.addListener("ready", async ({ device_id }) => {
        await transferPlaybackToDevice(device_id);
      });

      // First connect the player
      spotifyPlayer.connect().then((success) => {
        if (success) {
          console.log("Successfully connected to Spotify!");
        }
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;
        console.log(state.track_window.current_track);

        setCurrentTrack(state.track_window.current_track);
      });

      setPlayer(spotifyPlayer);

      // Cleanup
      return () => {
        if (spotifyPlayer) {
          spotifyPlayer.disconnect();
        }
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let isActive = true; // Flag to handle cleanup

    const playSongs = async (songs: BingoSong[]) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      for (let i = 0; i < songs.length; i++) {
        // Check if we should still be playing
        if (!isActive || !playing) {
          break;
        }

        try {
          setSongTracker(i + 1);
          setCurrentSong(songs[i]);
          await playTrack(songs[i].trackUri);

          // Wait and check playing state periodically
          for (let i = 0; i < timePerSong; i++) {
            if (!isActive || !playing) {
              await player.pause();
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          if (isActive && playing) {
            await player.pause();
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } catch (error) {
          console.error("Error playing song:", error);
        }
      }
      // Once we finish all the song we check if the user won the bingo
      checkEndGame();
    };

    if (player && playMusic && gameSongs && playing) {
      playSongs(gameSongs);
    }

    // Cleanup function
    return () => {
      isActive = false;
      if (player && !playing) {
        player.pause().catch(console.error);
        player.disconnect();
      }
    };
  }, [player, playMusic, gameSongs, playing, setCurrentSong]);

  return (
    <>
      {player ? (
        <div>
          {playMusic && (
            <p>
              Song {songTracker}/{gameSongs.length}
            </p>
          )}
        </div>
      ) : (
        <p> Initializing player... </p>
      )}
    </>
  );
};
export default Player;
