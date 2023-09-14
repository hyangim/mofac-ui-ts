import React,{ useEffect } from 'react';
import Divider from '@mui/material/Divider';
import AirInfoTabPage from '../component/AirInfoTabPage';

interface AirInfoProps {
  title: string;
}

function AirInfo(props: AirInfoProps) {
  const {title} = props;

  useEffect(()=>{
    document.title = title;   
  });

  return (
    <div>
    <Divider />  
    <AirInfoTabPage />
    </div>
  );
  
}
  
export default AirInfo;