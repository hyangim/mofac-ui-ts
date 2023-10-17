import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const CreateAccount = () => {

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);  

  const isSuccess = authCtx.isSuccess;
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const enteredNickname = nicknameInputRef.current!.value;

    authCtx.signup(enteredEmail, enteredPassword, enteredNickname);
  }
  
  const goLogin = useCallback(()=> {
    alert('singup 성공');
    return navigate("/login", { replace: true });
  },[navigate]);
  
  useEffect(() => {
    if (isSuccess) {
      console.log('isSuccess:'+isSuccess);
      goLogin();
    }
  }, [isSuccess, goLogin]);

  return (
    <section>
      <h1>Create Account</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Your email</label>
          <input id='email' required ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="password">Your password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div>
          <label htmlFor="nickname">NickName</label>
          <input type='text' id='nickname' required ref={nicknameInputRef}/>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default CreateAccount;