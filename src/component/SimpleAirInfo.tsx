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
                <TodayInfo item={item} index={index} />
                );    
            }else{
              return(<div/>);
            }
        })}
      </div>
  );
}

function TodayInfo({item, index}: {item:any, index:number}){
  console.log(`TodayInfo index:${index}`);
    return (
    <div key = {index}>
      <span>[{item.informCode}]</span>
      <span>{item.informData}기준</span><br/>
      <span>{item.informCause}</span>          
      <span><img src={item.imageUrl2}></img></span><br/>
      <span>{item.dataTime}</span>
    </div>
    )
}
export default SimpleAirInfo;

