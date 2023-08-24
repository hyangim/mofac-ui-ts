import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useMsrstnInfoInqire } from '../api/MsrstnInfoInqire';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface StaionProps {
  _sido: string,
  _station: string,
  selStationPage: Function;
}


export default function StationListCombo({_sido, _station, selStationPage}: StaionProps) {  
  //const sidoNames = ['전국', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'];
  const sidoNames = [
    { idx: 0, sidoName: '서울', sidoValue: '서울'},
    { idx: 0, sidoName: '부산', sidoValue: '부산'},
    { idx: 0, sidoName: '대구', sidoValue: '대구'},
    { idx: 0, sidoName: '인천', sidoValue: '인천'},
    { idx: 0, sidoName: '광주', sidoValue: '광주'},
    { idx: 0, sidoName: '대전', sidoValue: '대전'},
    { idx: 0, sidoName: '울산', sidoValue: '울산'},
    { idx: 0, sidoName: '경기', sidoValue: '경기'},
    { idx: 0, sidoName: '강원', sidoValue: '강원'},
    { idx: 0, sidoName: '충북', sidoValue: '충북'},
    { idx: 0, sidoName: '충남', sidoValue: '충남'},
    { idx: 0, sidoName: '전북', sidoValue: '전북'},
    { idx: 0, sidoName: '전남', sidoValue: '전남'},
    { idx: 0, sidoName: '경북', sidoValue: '경북'},
    { idx: 0, sidoName: '경남', sidoValue: '경남'},
    { idx: 0, sidoName: '제주', sidoValue: '제주'},
    { idx: 0, sidoName: '세종', sidoValue: '세종'},
  ];
  
  const [sido, setSido] = useState<string>(_sido);
  const [station, setStation] = useState<string>(_station);

  const {
    isLoading, 
    isError, 
    data: stationInfos 
  } = useMsrstnInfoInqire( sido );

  useEffect(()=>{
    console.log("Station ListCombo useEffect() 호출");
  },[]);

  if (isLoading) {
    // return <span>Loading...</span>
    return <CircularProgress />
  }

  if (isError) {
    return <span>Error</span>
  }

  const sidoHandleChange = (event: SelectChangeEvent) => {
    setSido(event.target.value);    
  };

  const stationChange = (event: SelectChangeEvent) => {
    setStation(event.target.value);
    selStationPage(event.target.value);
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
        {stationInfos?.map(function (info: any, index: number) {
            return (
              <MenuItem key={index} value={info.stationName}>{info.stationName}</MenuItem>
            );
        })}
      </Select>           
      </FormControl>
    </div>

  
  );
}
