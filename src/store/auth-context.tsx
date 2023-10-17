import React, { useState, useEffect, useCallback } from "react";
import * as authAction from './auth-action'; 

let logoutTimer: NodeJS.Timeout;

type Props = { children?: React.ReactNode }
type UserInfo = { username: string, nickname: string};
type LoginToken = { 
  grantType: string,
  accessToken: string,
  refreshToken: string,
  tokenExpiresIn: number
}

const AuthContext = React.createContext({
  token: '',
  userObj: { username: '', nickname: '' },
  isLoggedIn: false,
  isSuccess: false,
  isGetSuccess: false,
  signup: (username: string, password: string, nickname:string) =>  { return;},
  login: (username:string, password: string) => {return;},
  logout: () => {return;},
  getUser: () => {return;},
  changeNickname: (username:string, nickname:string) => {return;},
  changePassword: (exPassword: string, newPassword: string) => {return;}
});


export const AuthContextProvider:React.FC<Props> = (props) => {

  const tokenData = authAction.retrieveStoredToken();

  let initialToken:any;
  let initialRefreshToken:any;
  if (tokenData) {
    initialToken = tokenData.token!;
    initialRefreshToken = tokenData.refreshToken!;
  }

  const [token, setToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
  const [userObj, setUserObj] = useState({
    username: '',
    nickname: ''
  });
  
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isGetSuccess, setIsGetSuccess ] = useState<boolean>(false);

  const userIsLoggedIn = !!token;


  
  const signupHandler = (username:string, password: string, nickname: string) => {    
    setIsSuccess(false);
    const response = authAction.signupActionHandler(username, password, nickname);    
    response.then((result) => {
      if (result !== null) {        
        console.log('signupHandler success!!');
        setIsSuccess(true);        
        alert("가입되었습니다.");
      }
    });
  }

  const loginHandler = (username:string, password: string) => {
    setIsSuccess(false);
    console.log('loginHandler_isSuccess'+isSuccess);
    const data = authAction.loginActionHandler(username, password);
    data.then((result) => {
      if (result !== null) {
        console.log('signupHandler success!!');
        const loginData:LoginToken = result.data;
        setToken(loginData.accessToken);
        setRefreshToken(loginData.refreshToken);
        logoutTimer = setTimeout(
          refreshHandler,
          authAction.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn, loginData.refreshToken)
        );
        setIsSuccess(true);
        console.log('loginHandler_isSuccess'+isSuccess);
      }else{
        alert("로그인 실패!");
      }
    })
  };

  const refreshHandler = useCallback(() =>{
    if(refreshToken!=null){
      const data = authAction.refreshTokenActionHandler(refreshToken);
      alert("refrsh token ok")
      data.then((result) => {
        if (result !== null) {
          console.log('refreshHandler success!!');
          const loginData:LoginToken = result.data;
          setToken(loginData.accessToken);
          
          logoutTimer = setTimeout(
            refreshHandler,
            authAction.refreshTokenHandler(loginData.accessToken, loginData.tokenExpiresIn)
          );
          setIsSuccess(true);
          // console.log('loginHandler_isSuccess'+isSuccess);
        }else{
          alert("token이 만료되었습니다.");
          logoutHandler();
        }
      })
    }
  },[refreshToken]);

  const logoutHandler = () => {
    alert("로그아웃");
    setToken('');
    setRefreshToken('');
    authAction.logoutActionHandler();
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setIsSuccess(false);
  };

  // const logoutHandler = useCallback(() => {
  //   alert("로그아웃");
  //   setToken('');
  //   authAction.logoutActionHandler();
  //   if (logoutTimer) {
  //     clearTimeout(logoutTimer);
  //   }
  // }, []);

  const getUserHandler = () => {
    setIsGetSuccess(false);
    const data = authAction.getUserActionHandler(token);
    data.then((result) => {
      if (result !== null) {
        console.log('get user start!');
        const userData:UserInfo = result.data;
        setUserObj(userData);
        setIsGetSuccess(true);
      }
    })    
    
  };

  const changeNicknameHandler = (username:string, nickname:string) => {
    setIsSuccess(false);

    const data = authAction.changeNicknameActionHandler(username, nickname, token);
    data.then((result) => {
      if (result !== null) {
        const userData:UserInfo = result.data;
        setUserObj(userData);
        setIsSuccess(true);
        alert("변경되었습니다.");
      }
    })
  };

  const changePaswordHandler = (exPassword:string, newPassword: string) => {
    setIsSuccess(false);
    const data = authAction.changePasswordActionHandler(exPassword, newPassword, token);
    data.then((result) => {
      if (result !== null) {
        alert("변경되었습니다.");
        setIsSuccess(true);
        logoutHandler();
      }
    });
  };

  useEffect(() => {
    if(tokenData) {
      console.log(tokenData.duration);
      if(tokenData.duration <= 1000) {
        refreshHandler();
      }else{
        logoutTimer = setTimeout(refreshHandler, tokenData.duration);
      }      
    }
  }, [tokenData, refreshHandler]);


  const contextValue = {
    token,
    userObj,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
    getUser: getUserHandler,
    changeNickname: changeNicknameHandler,
    changePassword: changePaswordHandler
  }
  
  return(
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;