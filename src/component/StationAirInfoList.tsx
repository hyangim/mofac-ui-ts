import CircularProgress from '@mui/material/CircularProgress';
import { useMsrstnAcctoRltmMesureDnsty } from '../api/MsrstnAcctoRltmMesureDnsty';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {gradeClasType} from '../common/util';

interface StaionProps {
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
  khaiGrade:number,
  khaiValue:String, 
  pm10Grade:number,
  pm10Value:String, 
  pm25Grade:number,
  pm25Value:String,
  dataTime: String,
}


function StationAirInfoList({_station, _init}: StaionProps) {

  const {
    isLoading, 
    isError, 
    data: stationAirInfos
  } = useMsrstnAcctoRltmMesureDnsty( {numOfRows: 100,
    pageNo: 1,
    stationName: _station} );

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

  if(stationAirInfos.response.body.items===null){
    return <span>Error</span>
  } 


  let Todos:StaionInfo[] = [] ;

  
  stationAirInfos.response.body.items.forEach(function (airInfo: any, index: number) {
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
      pm10Grade: airInfo.pm10Grade,
      pm10Value: airInfo.pm10Value+gradeClasType(airInfo.pm10Grade, '/'),
      pm25Grade: airInfo.pm25Grade,
      pm25Value: airInfo.pm25Value+gradeClasType(airInfo.pm25Grade, '/'),  
      dataTime: airInfo.dataTime,
      } ];
      Todos = newTodos;
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 60 },
    { field: 'so2Value', headerName: '아황산가스(농도/지수)', width: 180 },
    { field: 'coValue', headerName: '일산화탄소(농도/지수)', width: 180 },
    { field: 'o3Value', headerName: '오존(농도/지수)', width: 180 }, 
    { field: 'khaiValue', headerName: '통합대기환경(수치/지수)', width: 180 },     
    { field: 'pm10Value', headerName: '미세먼지(수치/지수)', width: 180 },   
    { field: 'dataTime', headerName: '측정일시', width: 180 }, 
  ];

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon' },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya' },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
  // ];

  return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={Todos} columns={columns} rowHeight={25} hideFooter={true} />
    </div>
  );

}
  
  export default StationAirInfoList;