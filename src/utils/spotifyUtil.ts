import { Playlist } from "../types";

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
  const response = await fetch(
    `${API_URL}/api/playlists/${playlistID}/tracks`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

// Get a list of the playlists owned or followed by a Spotify user.
export async function getAllUsersPlaylists(userID: string, offset: number = 0) {
  const response = await fetch(
    `${API_URL}/api/users/${userID}/playlists?limit=50&offset=${offset}`,
    {
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

export async function getRandomPlaylist(
  playlists: Set<Playlist>,
  maxSongs: number
) {
  const options = {
    playlists: Array.from(playlists),
    maxSongs: maxSongs,
  };
  const response = await fetch(`${API_URL}/api/getRandomPlaylist`, {
    method: "POST",
    body: JSON.stringify(options),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
