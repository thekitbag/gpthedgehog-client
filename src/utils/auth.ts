import { getRequest } from "./api";

interface UserInfo {
  authenticated: boolean;
  searches: number;
  userName: string;
  subscriptionType: string;
  userId: number;
}

async function getUserInfo(): Promise<UserInfo> {
  try {
    const response = await getRequest("/me");
    if (response?.data.authenticated === true) {
      return response.data
    }

    else {
      return {'authenticated' : false, searches: -1, userName: '', subscriptionType: '', userId: -1}
    }
     
  } catch (error) {
    return {'authenticated' : false, searches: -1, userName: '', subscriptionType: '', userId: -1}; 
  }
}

export default getUserInfo