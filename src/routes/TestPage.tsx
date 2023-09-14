import React,{ useEffect, useState, useReducer, useRef } from 'react';
import Divider from '@mui/material/Divider';

import { useTranscoord } from '../api/Transcoord';
import { useNavigate } from "react-router-dom";
import ModalDialog from '../component/ModalDialog'


interface LocationInfo{
  longitude:number,
  latitude: number,
}



function TestPage() {
  const navigate = useNavigate();
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({longitude:0, latitude:0});
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
    setLocationInfo({
      longitude : pos.coords.longitude,
      latitude: pos.coords.latitude
    })
  });
  },[]);

  const [show, setShow] = useState(false);
  console.log('locationInfo'+locationInfo);
  const res = useTranscoord( locationInfo.longitude, locationInfo.latitude );

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

  function identity<Type>(arg: Type): Type {
    return arg;
  }
  const output = typeof identity<string>("myString");
  console.log('output:'+output);

  function f() {
    return { x: 10, y: 3 };
  }
  const Type2 = { x: 10, y: 3 };
  type Type1 = ReturnType<typeof f>;
  const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
  
  function handleRequest(url: string, method: "GET" | "POST"):void{
    console.log(url, method);
  }

  function firstElement<Type>(arr: Type[]): Type  {
    return arr[0];
  }

  // s is of type 'string'
const s = firstElement(["a", "b", "c"]);
console.log(s);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
console.log(n);
// u is of type undefined
const u = firstElement([]);
if(typeof u ==='undefined'){
  console.log('값이 없어요');
}


// interface MathFn {
//   (a: number, b: number): number;
//   operator: string;
// }
// const sum: MathFn = (a, b) => a + b;

// console.log(sum(1,2));
// sum.operator = '-';
// console.log(sum(1,2));


const sum: typeof MathFn = (a, b) => a + b;
sum.operator = '+';
console.log(sum(1,2)); 
  const req = { url: "https://example.com", method: "GET"} as const;
  handleRequest(req.url, req.method);

  if (res.isLoading) {
    // return <span>Loading...</span>
    return <span>처리중...</span>
  }

  if (res.isError) {
    return <span>Error</span>
  }
  if(res.isSuccess && res.data.meta.total_count>0){  

    // const fetchtempData  = async (name:string) => {

    return (
      <div>
        <Divider />
        <p>x:{res.data.documents[0].x}</p>    
        <p>y:{res.data.documents[0].y}</p>    
        <button onClick={() => { navigate('/'); }}>홈</button>
        <button onClick={() => { navigate('/cityAirInfo'); }}>시도별</button>
        <button onClick={() => { navigate('/stationAirInfo'); }}>측정소별</button>
        <button onClick={() => { navigate(-1); }}>이전 페이지로 이동</button>
        <div></div>
        <div>{false}</div>
        <div>{null}</div>
        <div>{undefined}</div>
        <div>{true}</div>
        <Counter initialCount={0} />
        <button onClick={() => setShow(true)}>
          Open dialog
        </button>
        <ModalDialog isOpen={show}>
          Hello there!
          <br />
          <button onClick={() => {
            setShow(false);
          }}>Close</button>
        </ModalDialog>
      </div>      
    );
    // const data = fetchtempData("서울");
    // console.log(data);
    //   return (
    //     <div>
    //           <li>This is page PageC</li>
    //     </div>
    //   );
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
export default TestPage;