import { useEffect, useState } from 'react';
import { useMinuDustFrcstDspth } from '../api/MinuDustFrcstDspth';
import {getToday} from '../common/util';


interface AirInfo{
  informCode: String;
  imageUrl1:String;
  informCause: String;
  informGrade:String;
}

function SimpleAirInfo() {
  
  let nowToday = getToday();
  const [searchDate, setSearchDate] = useState(nowToday);
  const res = useMinuDustFrcstDspth( searchDate );

  return (
      <div>        
        {res?.data?.response?.body?.items?.map(function (item: any, index: number) {
            if(item.informData===searchDate){
              return (
                <div key = {index}>
                    <span>[{item.informCode}]</span>
                    <span>{item.informData}</span>
                    <span>{item.informCause}</span>
                    <span>{item.dataTime}</span>
                    {/* <span>{item.informGrade}</span>                     */}
                    <span><img src={item.imageUrl2}></img></span>
                    
                </div>
                );
    
            }
        })}
      </div>
  );
}

export default SimpleAirInfo;

