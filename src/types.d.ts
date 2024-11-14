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
