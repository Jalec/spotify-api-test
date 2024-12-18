import { useEffect } from "react";
import { useUserDataStore } from "../store/userData";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const fetchUserData = useUserDataStore((state) => state.fetchUserData);
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        await fetchUserData();
        navigate("/content");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    completeLogin();
  }, [fetchUserData, navigate]);

  return <p>Authorizing...</p>;
};

export default Callback;
