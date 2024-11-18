// Juan Miguel Dimaté 0000282752 
// Andrey Esteban Conejo 0000281295 
// Carlos Bello 0000272648 
export interface AuthResponse {
    
    accessToken: string;
    userId:string
    
  }
  export interface AuthResponseError {
    body: {
      error: string;
    };
  }
  
  export interface User {
    _id: string;
    name: string;
    username: string;
  }
  
  export interface AccessTokenResponse {
    statusCode: number;
    body: {
      accessToken: string;
    };
    error?: string;
  }