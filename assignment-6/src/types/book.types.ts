export type Topic = {
  id: number;
  name: string;
  code: string;
};

export type Book = {
  id: number;
  name: string;
  author: string;
  // topic: Topic;
  topic: string,
};

export type BookList = Array<Book>
