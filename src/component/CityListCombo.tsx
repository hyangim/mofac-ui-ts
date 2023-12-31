import React, { useEffect, useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {sidoNames} from '../common/global';

export interface CityProps {
  _sido: string,
  selSidoPage: (sido: string)=>void,
}
 
export default function CityListCombo({_sido, selSidoPage}: CityProps) {    
  
  // const [sido, setSido] = useState<string>(_sido);
  const sido = useRef<string>(_sido);
  
  useEffect(()=>{
    // console.log("Station ListCombo useEffect() 호출");
  },[]);

 
  const sidoHandleChange = (event: SelectChangeEvent) => {
    sido.current = event.target.value;
    // setSido(event.target.value);
    selSidoPage(event.target.value);
    // console.log('sidoHandleChange>setSido() sido:'+ sido+'event.target.value:'+event.target.value);    
  };

  return (
    <div>
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="input-sido-label">지역</InputLabel>
      <Select
        labelId="select-sido-label"
        id="sido"
        value={sido.current}
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
    </div>  
  );
}
