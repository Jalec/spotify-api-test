import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

const Player: React.FC = () => {
  const [player, setPlayer] = useState(undefined);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Jordi Music Player",
        getOAuthToken: (cb) => {
          cb(localStorage.getItem("access_token"));
        },
        volume: 0.5,
      });

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        transferPlaybackToDevice(device_id);
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

      return () => {
        if (player) {
          player.disconnect();
        }
      };
    };
  }, []);

  const transferPlaybackToDevice = async (device_id: string) => {
    const token = localStorage.getItem("access_token");
    try {
      await fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_ids: [device_id],
          play: true,
        }),
      });
    } catch (error) {
      console.error("Failed to transfer playback", error);
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
          </div>
        </div>
      ) : (
        <p> Initializing player... </p>
      )}
    </>
  );
};
export default Player;
