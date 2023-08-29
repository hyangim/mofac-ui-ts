import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useCtprvnRltmMesureDnsty } from '../api/CtprvnRltmMesureDnsty';

interface MainProps {
  posts:string;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;
   
  const [airInfo, setAirInfo] = useState({
    numOfRows: 100,
    pageNo: 1,
    sidoName: '서울',
    stationName: '종로구',
  })
  
  const {
    isLoading, 
    isError, 
    data: airInfos 
  } = useCtprvnRltmMesureDnsty( airInfo );

  function selStationPage(sido: string){
    airInfo.sidoName = sido;
  }

  navigator.geolocation.getCurrentPosition(function(pos){
  console.log(pos);
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;
  alert("현재 위치는 : " + latitude + ", "+ longitude);
  });

  useEffect(()=>{
    document.title = '대기정보';
    console.log("useEffect() 호출");
  },[]);

  if (isLoading) {
    // return <span>Loading...</span>
    return <CircularProgress />
  }

  if (isError) {
    return <span>Error</span>
  }


  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Divider />   
      <div>{title}</div>
      {/* <li>{posts}</li> */}
      {/* <StationListCombo _sido={airInfo.sidoName} _station={airInfo.stationName} selStationPage={selStationPage} /> */}
      <div>        
        {airInfos?.map(function (airInfo: any, index: number) {
            return (
            <div key = {index}>                              
                <span>{airInfo.sidoName}</span>
                <span>{airInfo.stationName}</span>
            </div>
            );
        })}
      </div>
    </Grid>
  );
}
