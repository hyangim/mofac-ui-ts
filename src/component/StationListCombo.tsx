import React,{ useState, useRef, useEffect } from 'react';
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
  selSidoPage: (sido:string)=>void,
  selStationPage:(sido:string, station: string)=>void,
}

export default function StationListCombo({_sido, _station, selSidoPage, selStationPage}: StaionProps) {    

  // const [sido, setSido] = useState<string>(_sido);
  // const [station, setStation] = useState<string>(_station);
  const sido = useRef<string>(_sido);
  const station = useRef<string>(_station);

  const {
    isLoading, 
    isError, 
    data: stationInfos 
  } = useMsrstnInfoInqire( sido.current );


  const sidoHandleChange = (event: SelectChangeEvent) => {
    selSidoPage(event.target.value);
    sido.current = event.target.value;
    station.current = '';
  };

  const stationChange = (event: SelectChangeEvent) => {
    station.current = event.target.value;
    selStationPage(sido.current, event.target.value);
  };


  if (isLoading) {
    // return <span>Loading...</span>
    return <CircularProgress />
  }
  
  if (isError) {
    return <span>Error</span>
  }
  if (stationInfos?.response?.body?.items===null){
    return <span>데이터 조회 실패</span>
  }


  return (
    <div>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="input-sido-label">지역</InputLabel>
      <Select
        labelId="select-sido-label"
        id="sido"
        value={sido.current}
        // value={sido}
        label="지역"
        onChange={sidoHandleChange}
      >         
        {sidoNames?.map(function (sido, index) {
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
        value={station.current}
        // value={station}
        label="측정소"
        onChange={stationChange}
      >
        <MenuItem key='00' value=''/>
        {stationInfos?.response?.body?.items?.map(function (info: any, index: number) {
            return (
              <MenuItem key={index} value={info.stationName}>{info.stationName}</MenuItem>
            );
        })}
      </Select>           
      </FormControl>
    </div>

  
  );
}
