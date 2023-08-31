import airApi from './CommonAxios';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const MsrstnInfoInqire  = async (addr:string) => {  
  try{
    const res = await airApi.getMsrstnList(addr);
    // console.log('MsrstnInfoInqire res:'+JSON.stringify(res));
    if(typeof res.data.response === "undefined"){    
      throw  Error("MsrstnInfoInqire type error!");      // return errorRes;
    }else{
      return res.data;
    }
  }catch(error){
    throw  Error("MsrstnInfoInqire error");
  }
}

export const useMsrstnInfoInqire = (addr: string) => {
    
  return useQuery({
    queryKey: ['stationNames', addr],
    queryFn:()=> MsrstnInfoInqire(addr),
    onError: (error: any) => {
      console.log('useCtprvnRltmMesureDnsty on Error:'+JSON.stringify(error))
      if (error?.response?.data?.status === 400) {
        // notify(error?.response?.data?.guideMessage);
      }
    },
  });
  
}