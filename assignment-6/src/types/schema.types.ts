export type LoginRequest = {
    email: string;
    password: string;
  };
  
  export type UserProfile = {
    data: {
      id: number;
      email: string;
      accessToken: string;
    };
  };

  export type ResponseWithData<T> = {
    data: T
  };
  
//   export type Metadata = {
//     page: number;
//     pageSize: number;
//     totalPages: number;
//     totalRecords: number;
//   };
  
  export type BaseListResponse<T> = {
    data: T[];
    // metadata: Metadata;
  };
  