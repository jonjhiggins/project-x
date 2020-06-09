export interface QuestionItem {
  name: string;
  id: string;
  approve: undefined | boolean;
}

export type UpdateQuestion = (approve: boolean) => void;
