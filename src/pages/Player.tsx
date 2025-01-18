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
}

const Player: React.FC<PlayerProps> = ({ playMusic }) => {
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [songTracker, setSongTracker] = useState<number>(1);

  // Game state
  const gameSongs = useGameStore((state) => state.gameSongs);
  const setCurrentSong = useGameStore((state) => state.setCurrentSong);
  const playing = useGameStore((state) => state.playing);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Jordi Music Player",
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
          for (let i = 0; i < 10; i++) {
            if (!isActive || !playing) {
              await player.togglePlay();
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          if (isActive && playing) {
            await player.togglePlay();
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } catch (error) {
          console.error("Error playing song:", error);
        }
      }
    };

    if (player && playMusic && gameSongs && playing) {
      playSongs(gameSongs);
    }

    // Cleanup function
    return () => {
      isActive = false;
      if (player && !playing) {
        player.togglePlay().catch(console.error);
      }
    };
  }, [player, playMusic, gameSongs, playing, setCurrentSong]);

  return (
    <>
      {player ? (
        <div>
          {currentTrack && (
            <div>
              {/* <h3>Now Playing: </h3>
              <p>
                {currentTrack.name} by {currentTrack.artists[0].name}
              </p> */}
            </div>
          )}
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
