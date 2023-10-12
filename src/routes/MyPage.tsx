import React,{ useEffect, useState, useContext, useRef } from 'react';
import Divider from '@mui/material/Divider';
import AuthContext from '../store/auth-context';
import ChangeUsername from '../component/ChangeUserName';




function MyPage() {
  const authCtx = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const isLogin = authCtx.isLoggedIn;
  const isGet = authCtx.isGetSuccess;

  const callback = (nickname:string, userName:string) => {
    setNickname(nickname);
    setUsername(userName);
  }
  console.log('authCtx.userObj'+JSON.stringify(authCtx.userObj));
  useEffect(() => {
    console.log('isLogin'+isLogin);
    if (isLogin) {
      console.log('start');
      authCtx.getUser();
    } 
  }, [isLogin]);
  console.log('isGet'+isGet);
  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.nickname, authCtx.userObj.username);
    }
  }, [isGet]);



    return (
      <div>
        <Divider />
        마이페이지          
        <p>nickname:{nickname}</p>    
        <p>username:{username}</p>   
        <ChangeUsername username={username} nickname={nickname} />        
      </div>      
    );
 
  
}
  
export default MyPage;