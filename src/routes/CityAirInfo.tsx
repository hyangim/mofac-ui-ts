import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useCtprvnRltmMesureDnsty } from '../api/CtprvnRltmMesureDnsty';
import StationListCombo from '../component/StationListCombo';

interface CityProps {
  title: string;
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
    stationName: '종로구',
  })

  const {
    isLoading, 
    isError, 
    data: airInfos 
  } = useCtprvnRltmMesureDnsty( airInfo );

  function selStationPage(sido: string){
    setAirInfo({numOfRows: airInfo.numOfRows,
      pageNo: airInfo.pageNo,
      sidoName: sido,
      stationName: airInfo.stationName});    
    // airInfo.sidoName = sido;
  }

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
      <StationListCombo _sido={airInfo.sidoName} _station={airInfo.stationName}  selStationPage={selStationPage} />
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
  
export default CityAirInfo;