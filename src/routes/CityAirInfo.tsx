import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useCtprvnRltmMesureDnsty } from '../api/CtprvnRltmMesureDnsty';
import CityListCombo from '../component/CityListCombo';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import {gradeClasType, nvl} from '../common/util';

interface CityProps {
  title: string;
}

export interface CityAirInfoListSearchParameters {
  numOfRows: number;
  pageNo: number;
  sidoName: string;
}
interface StaionInfo{
  id:number,
  so2Grade: number,
  so2Value:String,
  coGrade: number,
  coValue:String,
  o3Grade: number,
  o3Value:String,
  khaiGrade:number,
  khaiValue:String,
  pm10Grade:number,
  pm10Value:String,
  pm25Grade:number,
  pm25Value:String,
  dataTime: String,
  sidoName:String,
  stationName:String,
}

function CityAirInfo(props: CityProps) {

  const {title} = props;

  const [airInfo, setAirInfo] = useState<CityAirInfoListSearchParameters>({
    numOfRows: 100,
    pageNo: 1,
    sidoName: '서울',
  })
 
  function selSidoPage(sido: string){
    setAirInfo({
      ...airInfo,
      sidoName: sido,
    });    
  }
  useEffect(()=>{
    document.title ='시도별 대기오염 정보 조회';
    // console.log("StationAirInfo useEffect() 호출");
  },[]);

  return (    
    <div>
      <Divider />
      <div>{title}</div>
      <CityListCombo _sido={airInfo.sidoName} selSidoPage={selSidoPage} />    
      <CityAirInfoList airInfo={airInfo} />  
    </div>
  );
}

function CityAirInfoList({airInfo}: {airInfo:CityAirInfoListSearchParameters} ){

  let Todos:StaionInfo[] = [] ;
  const res = useCtprvnRltmMesureDnsty( airInfo );
  // console.log('useCtprvnRltmMesureDnsty resturn res:'+JSON.stringify(res)); 

  if (res.isLoading) {
    // return <span>Loading...</span>
    return <CircularProgress />
  }

  if (res.isError) {
    return <span>Error</span>
  }
  if(res.isSuccess && res.data.response.header.resultCode==='00'){  
    res.data.response.body.items.forEach(function (airInfo: any, index: number) {
      const newTodos:StaionInfo[] = [...Todos, {
        id: index+1,
        so2Grade: airInfo.so2Grade,      
        so2Value: nvl(airInfo.so2Value)+gradeClasType(airInfo.so2Grade, '/'),
        coGrade: airInfo.coGrade,
        coValue: nvl(airInfo.coValue)+gradeClasType(airInfo.coGrade, '/'),
        o3Grade: airInfo.o3Grade,
        o3Value: nvl(airInfo.o3Value)+gradeClasType(airInfo.o3Grade, '/'),
        khaiGrade: airInfo.khaiGrade,
        khaiValue: nvl(airInfo.khaiValue)+gradeClasType(airInfo.khaiGrade, '/'),
        dataTime: airInfo.dataTime,
        pm10Grade: airInfo.pm10Grade,
        pm10Value: nvl(airInfo.pm10Value)+gradeClasType(airInfo.pm10Grade, '/'),
        pm25Grade: airInfo.pm25Grade,
        pm25Value: nvl(airInfo.pm25Value)+gradeClasType(airInfo.pm25Grade, '/'),        
        sidoName: airInfo.sidoName,
        stationName: airInfo.stationName,
        } ];
        Todos = newTodos;
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 60 },
    { field: 'stationName', headerName: '측정소', width: 120 },
    { field: 'so2Value', headerName: '아황산가스(농도/지수)', width: 140 },
    { field: 'coValue', headerName: '일산화탄소(농도/지수)', width: 140 },
    { field: 'o3Value', headerName: '오존(농도/지수)', width: 140 }, 
    { field: 'khaiValue', headerName: '통합대기환경(수치/지수)', width: 140 },
    { field: 'pm10Value', headerName: '미세먼지(수치/지수)', width: 140 },       
    { field: 'pm25Value', headerName: '초미세먼지(수치/지수)', width: 140 }, 
    { field: 'dataTime', headerName: '측정일시', width: 140 }, 
  ];
  return(
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={Todos} columns={columns} rowHeight={25} hideFooter={true} />
    </div>
  );
}

  
export default CityAirInfo;