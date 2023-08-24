import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useMsrstnAcctoRltmMesureDnsty } from '../api/MsrstnAcctoRltmMesureDnsty';

interface StaionProps {
    _station: string,
    _init:boolean,
}

function StationAirInfoList({_station, _init}: StaionProps) {


  const {
    isLoading, 
    isError, 
    data: stationAirInfos 
  } = useMsrstnAcctoRltmMesureDnsty( {numOfRows: 100,
    pageNo: 1,
    stationName: _station} );


  useEffect(()=>{

    console.log("StationAirInfoList useEffect() 호출");
  },[]);

  if(_init){
        
    return <div>초기화되었습니다.</div>
  }


  if (isLoading) {
    // return <span>Loading...</span>
    return <CircularProgress />
  }

  if (isError) {
    return <span>Error</span>
  }

  if(stationAirInfos===null){
    return <span>Error</span>
  }


  return (
      <div> 
        <div key='00'>                              
                  <span>so2Grade</span>                
                  <span>so2Value</span>
                  <span>coGrade</span>
                  <span>coValue</span>
                  <span>khaiValue</span>
        </div>       
        {stationAirInfos?.map(function (airInfo: any, index: number) {
            return (
            <div key={index}>                              
                <span>{airInfo.so2Grade}</span>                
                <span>{airInfo.so2Value}</span>
                <span>{airInfo.coGrade}</span>
                <span>{airInfo.coValue}</span>
                <span>{airInfo.khaiValue}</span>
            </div>
            );
        })}
      </div>
  );

}
  
  export default StationAirInfoList;