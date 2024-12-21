const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const scopes = import.meta.env.VITE_SPOTIFY_SCOPES;

const API_URL = "http://localhost:5000";

export function redirectToSpotifyAuth() {
  window.location.href = `${API_URL}/login`;
}

async function fetchWebApi(
  endpoint: string,
  method: "GET" | "POST",
  body?: any
) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    throw new Error("Token expired");
  }

  return response.json();
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
  console.log(data);
}

// Get track information
export async function getTrackInfo(track: string) {
  return fetchWebApi(`tracks/${track}`, "GET");
}

// Get all the tracks from a playlist given its playlist ID
export async function getPlaylistTracks(playlistID: string) {
  return fetchWebApi(`playlists/${playlistID}/tracks`, "GET");
}
