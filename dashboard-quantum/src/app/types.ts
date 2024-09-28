// Define the shape of the successful response
export interface RegistrationSuccessResponse {
    farmers: Array<{
      id: number;
      name: string;
      age?: number; // example field
      location: string;
      // Add any other fields that should be in the success response
    }>;
  }
  
  // Define the shape of the error response
  export interface RegistrationErrorResponse {
    error: string;
  }
  
  // Define the type for the fetch function
  export type FetchFarmersFunction = () => Promise<RegistrationSuccessResponse>;
  