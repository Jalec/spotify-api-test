import { create } from "zustand";
import { UserData } from "../types";
import { getCurrentUserProfile } from "../utils/spotifyUtil";

interface State {
  userData: UserData;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUserData: () => Promise<void>;
}

export const useUserDataStore = create<State>((set) => {
  return {
    userData: {
      userName: "",
      userID: "",
      userImages: [],
    },
    isAuthenticated: false,
    loading: true,
    fetchUserData: async () => {
      try {
        const response = await getCurrentUserProfile();
        if (response.ok) {
          const profile = await response.json();
          const userData: UserData = {
            userName: profile.display_name,
            userID: profile.id,
            userImages: [profile.images[0], profile.images[1]],
          };
          set({ userData: userData, isAuthenticated: true, loading: false });
        } else {
          set({ isAuthenticated: false, loading: false });
        }
      } catch (error) {
        set({ isAuthenticated: false, loading: false });
        console.log("Failed to fetch user data:", error);
      }
    },
  };
});
