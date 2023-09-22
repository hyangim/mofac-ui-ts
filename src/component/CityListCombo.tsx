import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {sidoNames} from '../common/global';

export interface CityProps {
  sido: string,
  sidoHandleChange: (event: SelectChangeEvent)=> void,
}
 
export default function CityListCombo({sido, sidoHandleChange}: CityProps) {    
  
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
        {sidoNames?.map(function (_sido, index) {
            return (
              <MenuItem key={index} value={_sido.sidoName}>{_sido.sidoName}</MenuItem>
            );
        })}
      </Select>
      </FormControl>
    </div>  
  );
}
