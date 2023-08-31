import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import SimpleAirInfo from '../component/SimpleAirInfo';
import { useMinuDustFrcstDspth } from '../api/MinuDustFrcstDspth';
import {getToday} from '../common/util';

interface MainProps {
  posts:string;
  title: string;
}

function Main(props: MainProps) {
  const { posts, title } = props;

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