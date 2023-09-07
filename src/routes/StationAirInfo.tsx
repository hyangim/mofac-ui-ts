import { useEffect, useState, useRef } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useMsrstnAcctoRltmMesureDnsty } from '../api/MsrstnAcctoRltmMesureDnsty';
import StationListCombo from '../component/StationListCombo';

import {gradeClasType, getUnit} from '../common/util';


interface StationProps {
  title: string;
}

interface AirInfo {
  numOfRows: number;
  pageNo: number;
  sidoName: string;
  stationName: string;
  init:boolean;
}


interface StaionInfo{
  id:number,
  so2Grade: number,
  so2Value:String,
  coGrade: number,
  coValue:String,
  o3Grade: number,
  o3Value:String,
  no2Grade:number,
  no2Value:String, 
  pm10Grade:number,
  pm10Value:String, 
  pm25Grade:number,
  pm25Value:String,
  dataTime: String,
}

function StationAirInfo(props: StationProps) {
  const {title} = props;

  const [airInfo, setAirInfo] = useState<AirInfo>({
    numOfRows: 100,
    pageNo: 1,
    sidoName: '서울',
    stationName: '종로구',
    init:false
  })
  
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
      // sidoName: sido,
      stationName: station,
      init:false
    });
  }

  useEffect(()=>{
    document.title ='측정소별 대기오염 정보 조회';
    // console.log("StationAirInfo useEffect() 호출");
  },[]);



  return (
    <div>
      <Divider />   
      <div>{title} 대기오염 정보 조회</div>
      {/* <StationListCombo selStationPage={selStationPage} /> */}
      <StationListCombo _sido={airInfo.sidoName} _station={airInfo.stationName} selSidoPage={selSidoPage} selStationPage={selStationPage} />
      <StationAirInfoList _station={airInfo.stationName} _init={airInfo.init}/>
    </div>
  );

}

interface StaionAirProps {
  _station: string,
  _init:boolean,
}
interface StaionInfo{
  id:number,
  so2Grade: number,
  so2Value:String,
  coGrade: number,
  coValue:String,
  o3Grade: number,
  o3Value:String,
  no2Grade:number,
  no2Value:String, 
  pm10Grade:number,
  pm10Value:String, 
  pm25Grade:number,
  pm25Value:String,
  dataTime: String,
}


function StationAirInfoList({_station, _init}: StaionAirProps) {

  const {
    isLoading, 
    isError, 
    data: stationAirInfos
  } = useMsrstnAcctoRltmMesureDnsty( {numOfRows: 100,
    pageNo: 1,
    stationName: _station} );

  //  if(_init){
        
  //   return <div>초기화되었습니다.</div>
  // }

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


  let Todos:StaionInfo[] = [] ;

  
  stationAirInfos.response.body.items.forEach(function (airInfo: any, index: number) {
    const newTodos:StaionInfo[] = [...Todos, {
      id: index+1,
      so2Grade: airInfo.so2Grade,      
      so2Value: getUnit(airInfo.so2Value,'SO2')+gradeClasType(airInfo.so2Grade, '/'),
      coGrade: airInfo.coGrade,
      coValue: getUnit(airInfo.coValue,'CO')+gradeClasType(airInfo.coGrade, '/'),
      o3Grade: airInfo.o3Grade,
      o3Value: getUnit(airInfo.o3Value,'O3')+gradeClasType(airInfo.o3Grade, '/'),
      no2Grade: airInfo.no2Grade,
      no2Value: getUnit(airInfo.no2Value,'NO2')+gradeClasType(airInfo.no2Grade, '/'),
      pm10Grade: airInfo.pm10Grade,
      pm10Value: getUnit(airInfo.pm10Value,'PM10')+gradeClasType(airInfo.pm10Grade, '/'),
      pm25Grade: airInfo.pm25Grade,
      pm25Value: getUnit(airInfo.pm25Value,'PM25')+gradeClasType(airInfo.pm25Grade, '/'),  
      dataTime: airInfo.dataTime,
      } ];
      Todos = newTodos;
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 40 },
    { field: 'so2Value', headerName: '아황산가스', width: 140 },
    { field: 'coValue', headerName: '일산화탄소', width: 140 },
    { field: 'o3Value', headerName: '오존', width: 140 }, 
    { field: 'no2Value', headerName: '이산화질소', width: 140 },     
    { field: 'pm10Value', headerName: '미세먼지', width: 140 },   
    { field: 'pm25Value', headerName: '초미세먼지', width: 140 }, 
    { field: 'dataTime', headerName: '측정일시', width: 140 }, 
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={Todos} columns={columns} rowHeight={25} hideFooter={true} />
    </div>
  );

}

export default StationAirInfo;