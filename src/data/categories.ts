import { QuestionItem } from "~types";

export default <
  {
    [key: string]: QuestionItem;
  }
>{
  fiction: { name: "Fiction", approve: undefined, id: "fiction" },
  "non-fiction": { name: "Non-fiction", approve: undefined, id: "non-fiction" },
  romance: { name: "Romance", approve: undefined, id: "romance" },
  humour: { name: "Humour", approve: undefined, id: "humour" },
  "science-fiction": {
    name: "Science fiction",
    approve: undefined,
    id: "science-fiction",
  },
  fantasy: { name: "Fantasy", approve: undefined, id: "fantasy" },
  "mystery-and-thriller": {
    name: "Mystery and thriller",
    approve: undefined,
    id: "mystery-and-thriller",
  },
  "historical-fiction": {
    name: "Historial fiction",
    approve: undefined,
    id: "historical-fiction",
  },
};
