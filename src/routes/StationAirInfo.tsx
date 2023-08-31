import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useMsrstnAcctoRltmMesureDnsty } from '../api/MsrstnAcctoRltmMesureDnsty';
import StationListCombo from '../component/StationListCombo';
import StationAirInfoList from '../component/StationAirInfoList';


interface StationProps {
  title: string;
}

function StationAirInfo(props: StationProps) {
  const {title} = props;

  const [airInfo, setAirInfo] = useState({
    numOfRows: 100,
    pageNo: 1,
    sidoName: '서울',
    stationName: '종로구',
    init:false
  })

  const {
    isLoading, 
    isError, 
    data: stationAirInfos 
  } = useMsrstnAcctoRltmMesureDnsty( airInfo );
  
  function selSidoPage(sido:string){
    setAirInfo({
      ...airInfo,
      sidoName: sido,
      init:true
    });
  }

  function selStationPage(sido:string, station: string){
    setAirInfo({
      ...airInfo,
      sidoName: sido,
      stationName: station,
      init:false
    });
  }

  useEffect(()=>{
    document.title ='측정소별 대기오염 정보 조회';
    // console.log("StationAirInfo useEffect() 호출");
  },[]);

  if (isLoading) {
    // return <span>Loading...</span>
    return <CircularProgress />
  }

  if (isError) {
    return <span>Error</span>
  }

  if(stationAirInfos.response.body.items===null){
    return <span>Error</span>
  }


  return (
    <div>
      <Divider />   
      <div>{title}</div>
      {/* <StationListCombo selStationPage={selStationPage} /> */}
      <StationListCombo _sido={airInfo.sidoName} _station={airInfo.stationName} selSidoPage={selSidoPage} selStationPage={selStationPage} />
      <StationAirInfoList _station={airInfo.stationName} _init={airInfo.init}/>
    </div>
  );

}
  
export default StationAirInfo;