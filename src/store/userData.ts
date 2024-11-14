import { create } from "zustand";
import { UserData } from "../types";
import { getCurrentUserProfile } from "../utils/spotifyUtil";

interface State {
  userData: UserData;
  fetchUserData: () => Promise<void>;
}

export const useUserDataStore = create<State>((set) => {
  return {
    userData: {
      userName: "",
      userID: "",
      userImages: [
        {
          height: 0,
          url: "",
          width: 0,
        },
        {
          height: 0,
          url: "",
          width: 0,
        },
      ],
    },
    fetchUserData: async () => {
      try {
        const profile = await getCurrentUserProfile();
        const userData: UserData = {
          userName: profile.display_name,
          userID: profile.id,
          userImages: [profile.images[0], profile.images[1]],
        };
        set({ userData: userData });
      } catch (error) {
        console.log("Failed to fetch user data:", error);
      }
    },
  };
});
