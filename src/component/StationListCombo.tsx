import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useMsrstnInfoInqire } from '../api/MsrstnInfoInqire';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {sidoNames} from '../common/global';

export interface StaionProps {
  _sido: string,
  _station: string,
  selSidoPage: Function,
  selStationPage: Function,
}

export default function StationListCombo({_sido, _station, selSidoPage, selStationPage}: StaionProps) {    

  const [sido, setSido] = useState<string>(_sido);
  const [station, setStation] = useState<string>(_station);

  const {
    isLoading, 
    isError, 
    data: stationInfos 
  } = useMsrstnInfoInqire( sido );

  if (isLoading) {
    // return <span>Loading...</span>
    return <CircularProgress />
  }
  
  if (isError) {
    return <span>Error</span>
  }
  if (stationInfos.response.body.items===null){
    return <span>데이터 조회 실패</span>
  }

  const sidoHandleChange = (event: SelectChangeEvent) => {
    setSido(event.target.value);
    selSidoPage(event.target.value);
    console.log('sidoHandleChange>setSido() sido:'+ sido+'event.target.value:'+event.target.value);    
  };

  const stationChange = (event: SelectChangeEvent) => {
    setStation(event.target.value);
    console.log('stationChange(sido):'+ sido) 
    console.log('stationChange(station):'+ station) 
    console.log('stationChange(event.target.value):'+ event.target.value) 
    selStationPage(sido, event.target.value);
    
  };

  return (
    <div>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="input-sido-label">지역</InputLabel>
      <Select
        labelId="select-sido-label"
        id="sido"
        value={sido}
        label="지역"
        onChange={sidoHandleChange}
      >
        {sidoNames?.map(function (sido: any, index: number) {
            return (
              <MenuItem key={index} value={sido.sidoName}>{sido.sidoName}</MenuItem>
            );
        })}
      </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="input-station-label">측정소</InputLabel>
      <Select
        labelId="sel-station-label"
        id="station"
        value={station}
        label="지역"
        onChange={stationChange}
      >
        {stationInfos.response.body.items?.map(function (info: any, index: number) {
            return (
              <MenuItem key={index} value={info.stationName}>{info.stationName}</MenuItem>
            );
        })}
      </Select>           
      </FormControl>
    </div>

  
  );
}
