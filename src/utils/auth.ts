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
    const response = await getRequest("/me");
    if (response) { // Check if response exists
      return response.status === 200;
    } else {
      return false; // Or handle the undefined response in a different way if needed
    }
  } catch (error) {
    return false; 
  }
}

export default checkAuthStatus