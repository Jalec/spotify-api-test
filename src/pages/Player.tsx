import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  getToken,
  playTrack,
  transferPlaybackToDevice,
} from "../utils/playerUtils";
import { usePlaylist } from "../hooks/usePlaylist";

const PLAYLIST_ID = "65PmVD0KzAxpAp2u89zGuR";

const Player: React.FC = () => {
  const [player, setPlayer] = useState(undefined);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const { playlist } = usePlaylist(PLAYLIST_ID);

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
            console.log(token);
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
        setIsPaused(state.paused);
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

  const playSong = () => {
    if (playlist) {
      playTrack(playlist[0].trackUri);
    }
  };

  return (
    <>
      {player ? (
        <div>
          <h2>Spotify Web Player</h2>
          <div>
            {currentTrack && (
              <div>
                <h3>Now Playing!</h3>
                <p>
                  {currentTrack.name} by {currentTrack.artists[0].name}
                </p>
              </div>
            )}
            <div>
              <button
                onClick={() => player.previousTrack()}
                disabled={!currentTrack}
              >
                <SkipBack className="h-6 w-6" />
              </button>
              <button
                onClick={() => player.togglePlay()}
                disabled={!currentTrack}
              >
                {isPaused ? (
                  <Play className="h-6 w-6" />
                ) : (
                  <Pause className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={() => player.nextTrack()}
                disabled={!currentTrack}
              >
                <SkipForward className="h-6 w-6" />
              </button>
            </div>
            <div>
              <button
                className="bg-black text-white rounded"
                onClick={playSong}
              >
                PLAY SONG!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p> Initializing player... </p>
      )}
    </>
  );
};
export default Player;
