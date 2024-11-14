import { useEffect, useState } from "react";
import { getTopTracks, redirectToSpotifyAuth } from "../utils/spotifyUtil";

function TopTracks() {
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await getTopTracks();
        setTopTracks(tracks.items);
      } catch (err) {
        if (err.message === "Token expired") {
          redirectToSpotifyAuth();
        } else {
          setError("Failed to fetch tracks");
        }
      }
    };
    fetchTracks();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Top 5 Tracks</h2>
      <ul>
        {topTracks.map((track) => (
          <li key={track.id}>
            {track.name} by{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopTracks;
