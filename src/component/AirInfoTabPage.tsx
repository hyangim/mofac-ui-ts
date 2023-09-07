import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {getToday} from '../common/util';
import { useMinuDustFrcstDspth } from '../api/MinuDustFrcstDspth';


export default function AirInfoTabPage() {
  const [value, setValue] = React.useState('PM10');
  let nowToday = getToday();
  const [searchDate, setSearchDate] = useState(nowToday);
  
  const res = useMinuDustFrcstDspth( searchDate );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  function TodayInfo({item, index}: {item:any, index:number}){
    const arr = item.informGrade.split(',');

      return (
        <TabPanel value={item.informCode}>
            <div>
            <span>{item.informData}기준</span><br/>
            <span>{item.informCause}</span><br/>
            <span>{item.informGrade}</span>
            <span><img src={item.imageUrl2}></img></span><br/>
            <span>{item.dataTime}</span>
            </div>
        </TabPanel>
      )
}

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="미세먼지" value="PM10" />
            <Tab label="초미세먼지" value="PM25" />
            <Tab label="오존" value="O3" />
          </TabList>
        </Box>
        {res?.data?.response?.body?.items?.map(function (item: any, index: number) {
            let pm10Cnt = 0;
            let pm25Cnt = 0;
            let o3Cnt = 0;
            if(item.informData===searchDate && item.informCode==='PM10' && pm10Cnt===0){
              pm10Cnt++;
              return(
                  <TodayInfo item={item} index={index} />
              );
            }else if(item.informData===searchDate && item.informCode==='PM25' && pm25Cnt===0){
              pm10Cnt++;
              return(
                  <TodayInfo item={item} index={index} />                    
              );
            }else if(item.informData===searchDate && item.informCode==='O3' && o3Cnt===0){  
              o3Cnt++;                                   
              return(
                  <TodayInfo item={item} index={index} />
              );
            }
            return('');
        })} 
      </TabContext>
    </Box>
  );
}


