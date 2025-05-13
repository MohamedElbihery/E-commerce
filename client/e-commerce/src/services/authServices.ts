  import { apiClient } from "./apiClient";

  const api = apiClient();

  const signUp = async (
    name: string,
    email: string,
    password: string,
    rePassword: string
  ) => {
    try {
      const response = await api.post("auth/signUp", {
        json: { name, email, password, rePassword },
      });
      
      return await response.json();
    } catch (error) {
      console.error("Sign up failed:", error.response.data);
      throw error;
    }
  };

  const verifyOTP = async (email: string, OTP: string) => {
    try {
      const response = await api.post("auth/verifyOTP", {
        json: { email, OTP },
      });
      return response.json(); // or response.json() depending on your API client
    } catch (error) {
      // Handle error appropriately
      console.error("verification failed:", error);
      throw error; // Re-throw the error if you want calling code to handle it
    }
  };
  interface LoginResponse {
    token: string;
  }
  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post("auth/logIn", {
        json: { email, password },
      });
      
      // Ensure the response is of the expected type (LoginResponse)
      const data: LoginResponse = await response.json(); 
      return data;  // Now TypeScript knows the type of the response
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw the error to be handled in the calling function
    }
  };

  export { signUp, verifyOTP,login };
