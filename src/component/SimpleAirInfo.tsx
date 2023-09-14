import React from 'react';
import { useMinuDustFrcstDspth } from '../api/MinuDustFrcstDspth';
import {getToday} from '../common/util';

function SimpleAirInfo() {
  
  const nowToday = getToday();
  const searchDate = nowToday;
  const res = useMinuDustFrcstDspth( nowToday );
   
  return (
      <div>        
        {res?.data?.response?.body?.items?.map(function (item: any, index: number) {
            if(item.informData===searchDate){
              return (
                <TodayInfo item={item} key={index} />
                );    
            }else{
              return('');
            }
        })}
      </div>
  );
}

function TodayInfo({item, key}: {item:any, key:number}){  
    return (
    <div key = {key}>
      <span>[{item.informCode}]</span>
      <span>{item.informData}기준</span><br/>
      <span>{item.informCause}</span>          
      <span><img src={item.imageUrl2}></img></span><br/>
      <span>{item.dataTime}</span>
    </div>
    )
}
export default SimpleAirInfo;

