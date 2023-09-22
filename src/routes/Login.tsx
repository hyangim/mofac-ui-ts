import React from 'react';
import Divider from '@mui/material/Divider';
// import { useLoginInfo } from "../state";
import { useState , useRef, useContext} from "react";
// import { useCookies } from "react-cookie";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import AuthContext from '../store/auth-context';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();  

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    setIsLoading(true);
    authCtx.login(enteredEmail, enteredPassword);
    setIsLoading(false);

    if (authCtx.isSuccess) {
      alert("login 성공");
      //navigate("/Mypage", { replace: true });
    }
      
  }

  function goCreateAccountPage(){
    return navigate("/createAccount", { replace: true });
  }

  return (
    <div
    >
      <Divider />
      로그인 페이지 입니다.
      <section>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='id'>Your Id</label>
            <input id='id' required ref={emailInputRef}/>
          </div>
          <div>
            <label htmlFor="password">Your password</label>
            <input type='password' id='password' required ref={passwordInputRef}/>
          </div>
          <div>
            <button type='submit'>Login</button>
            {isLoading && <p>Loading</p>}
            <p>
              <button onClick={goCreateAccountPage}>Create Account</button>
            </p>
          </div>
        </form>
      </section>      
      
    </div>
  );
}

export default Login;