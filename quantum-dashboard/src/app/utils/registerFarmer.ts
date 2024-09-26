const url = 'api/farmers/'
export const userRegister = async (registerData: { farmers_name: string; farmer_location: string; phone_number: string; farmer_id: number;sensor_id:number }) => {
  try {
    if (!url) {
      throw new Error('Base URL not set.');
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.detail || 'Register failed. Invalid Credentials' };
    }
    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { error: 'An error occurred. Please try again later.' };
  }
};