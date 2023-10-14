export type LoginRequest = {
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    data: {
      id: number;
      email: string;
      accessToken: string;
    };
  };
  
  export type Metadata = {
    page: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
  
  export type BaseListResponse<T> = {
    data: T[];
    metadata: Metadata;
  };
  
  export type Topic = {
    id: number;
    name: string;
    code: string;
  };
  
  export type Book = {
    id: number;
    name: string;
    author: string;
    topic: Topic;
  };
  