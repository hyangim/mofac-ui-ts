import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useCtprvnRltmMesureDnsty } from '../api/CtprvnRltmMesureDnsty';
import CityListCombo from '../component/CityListCombo';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {gradeClasType} from '../common/util';

interface CityProps {
  title: string;
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
  dataTime: String,
  sidoName:String,
  stationName:String,
}

function CityAirInfo(props: CityProps) {

  const {title} = props;
  // const airInfo = {
  //   numOfRows: 100,
  //   pageNo: 1,
  //   sidoName: '서울',
  // }

  const [airInfo, setAirInfo] = useState({
    numOfRows: 100,
    pageNo: 1,
    sidoName: '서울',
  })

  // const {
  //   isLoading, 
  //   isError, 
  //   data: airInfos 
  // } = useCtprvnRltmMesureDnsty( airInfo );

  const res = useCtprvnRltmMesureDnsty( airInfo );
  
  console.log('useCtprvnRltmMesureDnsty resturn res:'+JSON.stringify(res));  
  function selSidoPage(sido: string){
    setAirInfo({numOfRows: airInfo.numOfRows,
      pageNo: airInfo.pageNo,
      sidoName: sido,});    
  }


  // if (isLoading) {
  //   // return <span>Loading...</span>
  //   return <CircularProgress />
  // }

  // if (isError) {
  //   return <span>Error</span>
  // }


  let Todos:StaionInfo[] = [] ;

  if(res.isSuccess){  
  res.data.forEach(function (airInfo: any, index: number) {
    const newTodos:StaionInfo[] = [...Todos, {
      id: index+1,
      so2Grade: airInfo.so2Grade,      
      so2Value: airInfo.so2Value+gradeClasType(airInfo.so2Grade, '/'),
      coGrade: airInfo.coGrade,
      coValue: airInfo.coValue+gradeClasType(airInfo.coGrade, '/'),
      o3Grade: airInfo.o3Grade,
      o3Value: airInfo.o3Value+gradeClasType(airInfo.o3Grade, '/'),
      khaiGrade: airInfo.khaiGrade,
      khaiValue: airInfo.khaiValue+gradeClasType(airInfo.khaiGrade, '/'),
      dataTime: airInfo.dataTime,
      pm10Grade: airInfo.pm10Grade,
      pm10Value: airInfo.pm10Value+gradeClasType(airInfo.pm10Grade, '/'),
      sidoName: airInfo.sidoName,
      stationName: airInfo.stationName,
      } ];
      Todos = newTodos;
  });
}

  debugger;  

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 60 },
    { field: 'stationName', headerName: '측정소', width: 120 },
    { field: 'so2Value', headerName: '아황산가스(농도/지수)', width: 140 },
    { field: 'coValue', headerName: '일산화탄소(농도/지수)', width: 140 },
    { field: 'o3Value', headerName: '오존(농도/지수)', width: 140 }, 
    { field: 'khaiValue', headerName: '통합대기환경(수치/지수)', width: 140 },
    { field: 'pm10Value', headerName: '미세먼지(수치/지수)', width: 140 },       
    { field: 'dataTime', headerName: '측정일시', width: 140 }, 
  ];


  return (    
    <div>
      <CityListCombo _sido={airInfo.sidoName} selSidoPage={selSidoPage} />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={Todos} columns={columns} rowHeight={25} hideFooter={true} />
      </div>
    </div>
  );
}
  
export default CityAirInfo;