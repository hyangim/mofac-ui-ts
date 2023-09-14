import React,{ useEffect } from 'react';
import Divider from '@mui/material/Divider';
import SimpleAirInfo from '../component/SimpleAirInfo';
import Title from '../component/Title';

interface MainProps {
  posts:string;
  title: string;
}

function Main(props: MainProps) {
  const { title } = props;

  useEffect(()=>{
    document.title = title;
  });

  return (
    <div
    >
      <Divider />
      <Title title={title} />
      <SimpleAirInfo />
    </div>
  );
}

export default Main;