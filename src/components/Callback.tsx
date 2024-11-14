import { useEffect, useRef } from "react";
import { getAccessToken } from "../utils/spotifyUtil";
import { useUserDataStore } from "../store/userData";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();
  const fetchUserData = useUserDataStore((state) => state.fetchUserData);
  const userData = useUserDataStore((state) => state.userData);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  async function exchangeCodeForToken(code: string) {
    const token_obtained = await getAccessToken(code);
    if (token_obtained) {
      await fetchUserData();
      navigate("/content");
    }
  }

  return <p>Authorizing...</p>;
}

export default Callback;
