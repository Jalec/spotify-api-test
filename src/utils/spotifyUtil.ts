const API_URL = "http://localhost:5000";

export function redirectToSpotifyAuth() {
  window.location.href = `${API_URL}/login`;
}

export async function getCurrentUserProfile() {
  const response = await fetch(`${API_URL}/api/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

// Services
// Get you top 5 trcks
export async function getTopTracks() {
  //return fetchWebApi("me/top/tracks?limit=5", "GET");
  const response = await fetch(`${API_URL}/api/me/top/tracks?limit=5`, {
    credentials: "include", // Ensures cookies are sent with the request.
  });
  const data = await response.json();
  return data;
}

// Get all the tracks from a playlist given its playlist ID
export async function getPlaylistTracks(playlistID: string) {
  // return fetchWebApi(`playlists/${playlistID}/tracks`, "GET");
  const response = await fetch(
    `${API_URL}/api/playlists/${playlistID}/tracks`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}
