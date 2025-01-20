interface UserImage {
  height: number;
  url: string;
  width: number;
}

export interface UserData {
  userName: string;
  userID: string;
  userImages: UserImage[];
}

// Interface for the structure of a Bingo's song
export interface BingoSong {
  song: string;
  marked: boolean;
  trackUri: string;
  artists: string;
}

export type GameResult = "TBD" | "LOST" | "WON";

export interface Playlist {
  name: string;
  owner: string;
  id: string;
  type: string;
  tracskCount: number;
  image: string;
}
