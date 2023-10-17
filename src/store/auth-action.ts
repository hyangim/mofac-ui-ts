import { GET, POST }  from "./fetch-auth-action";

const createTokenHeader = (token:string) => {
  return {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
}

const calculateRemainingTime = (expirationTime:number) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const loginTokenHandler = (token:string, expirationTime:number, refreshToken:string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', String(expirationTime));
  localStorage.setItem('refreshToken', refreshToken);

  const remainingTime = calculateRemainingTime(expirationTime);
  return remainingTime;
}

export const refreshTokenHandler = (token:string, expirationTime:number) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', String(expirationTime));
  const remainingTime = calculateRemainingTime(expirationTime);
  return remainingTime;
}

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedRefreshToken = localStorage.getItem('refreshToken');
  const storedExpirationDate = localStorage.getItem('expirationTime') || '0';  
  const remaingTime = calculateRemainingTime(+ storedExpirationDate);
  if(storedToken===null){
    return null;
  }

  // if(remaingTime <= 1000) {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expirationTime');
  //   localStorage.removeItem('refreshToken');
  //   return null
  // }

  return {
    token: storedToken,
    refreshToken: storedRefreshToken,
    duration: remaingTime
  }
}

export const signupActionHandler = (username: string, password: string, nickname: string) => {
  const URL = '/api/signup'
  const signupObject = {
     'username': username, 
     'password': password,
     'nickname': nickname 
  };
  
  const response = POST(URL, signupObject, {});
  return response;
};

export const loginActionHandler = (username:string, password: string) => {
  const URL = '/api/authenticate';
  // const URL = '/auth/login';
  const loginObject = {
     'username': username, 
     'password': password 
    };
  const response = POST(URL, loginObject, {});

  return response;
};

export const refreshTokenActionHandler = (refreshToken:string) => {
  const URL = '/api/refresh';
  const refreshObject = {
     'refreshToken': refreshToken
    };
  const response = POST(URL, refreshObject, {});

  return response;
};

export const logoutActionHandler = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('refreshtoken');
};

// export const getUserActionHandler = (token:string) => {
//   const URL = '/member/me';
//   const response = GET(URL, createTokenHeader(token));
//   return response;
// }

export const getUserActionHandler = (token:string) => {
  const URL = '/api/user';
  const response = GET(URL, createTokenHeader(token));
  return response;
}

export const changeNicknameActionHandler = (username:string, nickname:string, token: string) => {
  const URL = '/api/nickname';
  const changeNicknameObj = { 
    "username" : username,
    "nickname" : nickname 
  };
  const response = POST(URL, changeNicknameObj, createTokenHeader(token));

  return response;
}

export const changePasswordActionHandler = (
  exPassword: string,
  newPassword: string,
  token: string
) => {
  const URL = '/api/password';
  const changePasswordObj = {
    "exPassword" : exPassword, 
    "newPassword" : newPassword 
  }
  const response = POST(URL, changePasswordObj, createTokenHeader(token));
  return response;
}