import axios from 'axios';

interface GetParams {
  queryString: string;
}

const getRequest = async (endpoint:string, params?: GetParams) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const instance = axios.create({
    withCredentials: true,
    headers: headers
  })

  try {
    if (params) {
      const req = await instance.get('api' + endpoint + '?' + params.queryString)
      return req
    } else {
      const req = await instance.get('api' + endpoint)
      return req
    }

  } catch (err:any) {
    if(err.response.status === 401) {
      //window.location.href = '/'
    }
    console.log(err)
  }
}

const postRequest = async (endpoint: string, data:object) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const instance = axios.create({
    withCredentials: true,
    headers: headers
  })

  try {
    const req = await instance.post('api' + endpoint, data);

    if (req.status >= 200 && req.status < 300) {
      // Success: Return the successful response
      return req;  // <--- This was missing 
    } else if (req.status === 400) {
      // Bad Request: Handle validation errors from Flask
      const errorData = req.data; // Assuming Flask sends error details in the response
      throw new Error(errorData.error || 'Bad Request');
    } else if (req.status === 409) {
      // Conflict: Handle user already exists error
      throw new Error('User already exists');
    } else {
      // Other Errors: Handle other error status codes from Flask
      throw new Error('An error occurred during signup');
    } 
  }   catch (err:any) {
      // Catch and log errors
      console.error(err);
      throw err; // Re-throw the error so it can be handled in your component
    }
  }

const postAudio = async (endpoint: string, blob: Blob) => {
  const formData = new FormData();
  formData.append('audio', blob);

  const headers = {
    'Content-Type': 'multipart/form-data'
  };

  const instance = axios.create({
    withCredentials: true,
    headers: headers
  });

  try {
    const req = await instance.post('api' + endpoint, formData);
    return req;
  } catch (err) {
    console.log(err);
  }
};

export {getRequest, postRequest, postAudio}