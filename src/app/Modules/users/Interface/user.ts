export interface User {
  id?: number;
  isDeleted?: boolean;
  creationDate?: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  userPhotoPath?: string;
  birthDate: Date;
  gender: number;
  genderString?: string;
  nickName: string;
  profile?: number;
  profileString?: string;
  isBanned?: boolean
}

export enum Gender{
  masculine,
  feminine,
  neuter,
  unspecified
}

export enum Profiles
{
    Administrator,
    Member
}
