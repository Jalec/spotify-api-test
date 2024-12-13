const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const scopes = import.meta.env.VITE_SPOTIFY_SCOPES;

export function redirectToSpotifyAuth() {
  window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
}

export async function getAccessToken(code: string) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });
  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return true;
  } else {
    return false;
  }
  //   localStorage.setItem("access_token", data.access_token);
  //   localStorage.setItem("refresh_token", data.refresh_token);
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
  const token = localStorage.getItem("access_token");
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

// Services
// Get you top 5 trcks
export async function getTopTracks() {
  return fetchWebApi("me/top/tracks?limit=5", "GET");
}

// Get track information
export async function getTrackInfo(track: string) {
  return fetchWebApi(`tracks/${track}`, "GET");
}

// Get all the tracks from a playlist given its playlist ID
export async function getPlaylistTracks(playlistID: string) {
  return fetchWebApi(`playlists/${playlistID}/tracks`, "GET");
}
