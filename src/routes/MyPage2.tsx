import React,{ useEffect, useState, useReducer, useRef } from 'react';
import Divider from '@mui/material/Divider';

import { useTranscoord } from '../api/Transcoord';
import { useUser } from '../api/User';
import { useNavigate } from "react-router-dom";
import ModalDialog from '../component/ModalDialog'


interface LocationInfo{
  longitude:number,
  latitude: number,
}



function MyPage2() {
  const navigate = useNavigate();
    
  const userRes = useUser( 'admin' );
  console.log('userRes'+JSON.stringify(userRes));

  function init(initialCount: any) {
    return {count: initialCount};
  }
  
  
  function reducer(state:any, action:any) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      case 'reset':
        return init(action.payload);
      default:
        throw new Error();
    }
  }
  
  function Counter({initialCount}: any) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
      <>
        Count: {state.count}
        <button
          onClick={() => dispatch({type: 'reset', payload: initialCount})}>
          Reset
        </button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </>
    );
  }

  function handleRequest(url: string, method: "GET" | "POST"):void{
    console.log(url, method);
  }

  function firstElement<Type>(arr: Type[]): Type  {
    return arr[0];
  }




  if (userRes.isLoading) {
    // return <span>Loading...</span>
    return <span>처리중...</span>
  }

  if (userRes.isError) {
    return <span>Error</span>
  }
  if(userRes.isSuccess){  
    return (
      <div>
        <Divider />
        <p>id:{userRes?.data?.result?.id}</p>    
        <p>username:{userRes?.data?.result?.username}</p>    
       
        <Counter initialCount={0} />
      </div>      
    );
    
  }else{
    return(
      <div></div>
    );
  }
 
  
}
  
declare function MathFn(a: number, b: number): number;
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace MathFn {
  let operator: '+';
}
export default MyPage2;