import { getRequest } from "./api";

function isAuthenticated(): boolean {
  const sessionCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('session='))
    ?.split('=')[1];

  return !!sessionCookie && document.cookie.includes('path=/');
}

async function checkAuthStatus(): Promise<boolean> {
  try {
    const response = await getRequest("/me", null); // Fetch user data if logged in
    return response.status === 200; // 200 OK means authenticated
  } catch (error) {
    return false; // Any error means not authenticated
  }
}

export default checkAuthStatus