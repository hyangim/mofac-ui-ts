import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useCtprvnRltmMesureDnsty } from '../api/CtprvnRltmMesureDnsty';
import CityListCombo from '../component/CityListCombo';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import {gradeClasType, getUnit} from '../common/util';

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
  no2Grade:number,
  no2Value:String,
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
      <div>{title} 대기오염 정보 조회</div>
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
        so2Value: getUnit(airInfo.so2Value,'SO2')+gradeClasType(airInfo.so2Grade, '/'),
        coGrade: airInfo.coGrade,
        coValue: getUnit(airInfo.coValue,'CO')+gradeClasType(airInfo.coGrade, '/'),
        o3Grade: airInfo.o3Grade,
        o3Value: getUnit(airInfo.o3Value,'O3')+gradeClasType(airInfo.o3Grade, '/'),
        no2Grade: airInfo.no2Grade,
        no2Value: getUnit(airInfo.no2Value,'NO2')+gradeClasType(airInfo.no2Grade, '/'),
        dataTime: airInfo.dataTime,
        pm10Grade: airInfo.pm10Grade,
        pm10Value: getUnit(airInfo.pm10Value,'PM10')+gradeClasType(airInfo.pm10Grade, '/'),
        pm25Grade: airInfo.pm25Grade,
        pm25Value: getUnit(airInfo.pm25Value,'PM25')+gradeClasType(airInfo.pm25Grade, '/'),        
        sidoName: airInfo.sidoName,
        stationName: airInfo.stationName,
        } ];
        Todos = newTodos;
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 40 },
    { field: 'stationName', headerName: '측정소', width: 100 },
    { field: 'so2Value', headerName: '아황산가스', width: 140 },
    { field: 'coValue', headerName: '일산화탄소', width: 140 },
    { field: 'o3Value', headerName: '오존', width: 140 }, 
    { field: 'no2Value', headerName: '이산화질소', width: 140 },
    { field: 'pm10Value', headerName: '미세먼지', width: 140 },       
    { field: 'pm25Value', headerName: '초미세먼지', width: 140 }, 
    { field: 'dataTime', headerName: '측정일시', width: 140 }, 
  ];
  return(
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={Todos} columns={columns} rowHeight={25} hideFooter={true} />
    </div>
  );
}

  
export default CityAirInfo;