const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Retrieve acces token
export async function getToken() {
  const response = await fetch(`${API_URL}/token`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

// Transfer playback to website
export async function transferPlaybackToDevice(device_id: string) {
  try {
    await fetch(`${API_URL}/api/me/player`, {
      // Use your backend API URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        device_ids: [device_id],
        play: false,
      }),
    });
  } catch (error) {
    console.error("Failed to transfer playback", error);
  }
}

// Play a specific track
export async function playTrack(track: string) {
  try {
    await fetch(`${API_URL}/api/me/player/play`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        uris: [track],
        // If you want to play from a specific position (in milliseconds)
        // position_ms: 0
      }),
    });
  } catch (error) {
    console.error("Failed to play track:", error);
  }
}
