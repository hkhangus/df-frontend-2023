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
  topic: Topic,
};

export interface BookPayload {
  name: string;
  author: string;
  topicId: number | string
}

export type BookList = Array<Book>
