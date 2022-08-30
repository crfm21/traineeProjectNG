export interface Comment {
  id?: number;
  isDeleted?: boolean;
  creationDate?: Date;
  commentText: string;
  memberId?: number;
  memberNickname?: string;
  recipeId: number;
}
