export interface QuestionItem {
  name: string;
  id: string;
  approve: undefined | boolean;
}

export type UpdateQuestion = (id: string, approve: boolean) => void;
