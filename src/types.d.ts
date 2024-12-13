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
}
