import airApi from './CommonAxios';
import { useQuery } from '@tanstack/react-query';

const MsrstnInfoInqire  = async (addr:string) => {  
    const res = await airApi.getMsrstnList(addr);
    return res.data;
}

export const useMsrstnInfoInqire = (addr: string) => {
    
  return useQuery({
    queryKey: ['stationNames', addr],
    queryFn:()=> MsrstnInfoInqire(addr),
    onError: (error: any) => {
      console.log('useCtprvnRltmMesureDnsty on Error:'+JSON.stringify(error));    
    },
  });
  
}