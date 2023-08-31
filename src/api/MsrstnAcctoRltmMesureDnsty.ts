import airApi from './CommonAxios'
import { useQuery } from '@tanstack/react-query';

interface ArpltnInfoProps {
numOfRows:number;
pageNo:number;
stationName: string;
}

const MsrstnAcctoRltmMesureDnsty  = async (stationName:string) => {
  
  try{
      const res = await airApi.getMsrstnAcctoRltmMesureDnsty(stationName);
      if(typeof res.data.response === "undefined"){
        throw  Error("type error!");
      }else{
        return res.data;
      }
  }catch(error){
      throw  Error("MsrstnAcctoRltmMesureDnsty error");
  }
}

export const useMsrstnAcctoRltmMesureDnsty = (props: ArpltnInfoProps) => {

  return useQuery({
    queryKey: ['stationAirInfos', props.stationName],
    queryFn:()=> MsrstnAcctoRltmMesureDnsty(props.stationName),
    onError: (error: any) => {
      console.log('useCtprvnRltmMesureDnsty on Error:'+JSON.stringify(error))
      if (error?.response?.data?.status === 400) {
        // notify(error?.response?.data?.guideMessage);
      }
    },
  });
  
}