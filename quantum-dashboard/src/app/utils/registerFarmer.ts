import { FarmerDetails } from "./types";

const url = '/api/farmers/'
export const userRegister = async (registerData: FarmerDetails) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) {
      throw new Error (`Error: ${response.status} ${response.statusText}`)
    }
    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw new Error ('Failed to post data')
  }
};