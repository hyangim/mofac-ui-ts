import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import SimpleAirInfo from '../component/SimpleAirInfo';

interface MainProps {
  posts:string;
  title: string;
}

function Main(props: MainProps) {
  const { title } = props;

  useEffect(()=>{
    document.title = '홈';
    // console.log("useEffect() 호출");
  },[]);

  return (
    <div
    >
      <Divider />
      <div>{title}</div>
      <SimpleAirInfo />
    </div>
  );
}

export default Main;