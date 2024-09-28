
const url = '/api/login';
export const userlogin = async (loginData: { email: string; password: string; }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        return response.json();
    } catch (error) {
        throw new Error((error as Error).message);
    }
};















