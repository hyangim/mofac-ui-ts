import { useQuery } from '@tanstack/react-query';
import cacaoApi from './KakaoAxios';
import commonApi from './CommonAxios';

const Transcoord  = async (longitude: number, latitude:number) => {  
  try{
    const res = await cacaoApi.getTranscoord(longitude, latitude);
    console.log('Transcoord res:'+JSON.stringify(res));
    return res.data;
    
  }catch(error){
    throw  Error("MsrstnInfoInqire error");
  }
}

export const useTranscoord = (longitude: number, latitude:number) => {
    
    return useQuery({
      queryKey: ['TMInfo', longitude, latitude],
      queryFn:()=> Transcoord(longitude, latitude),
      onError: (error: any) => {
        console.log('useCtprvnRltmMesureDnsty on Error:'+JSON.stringify(error))
        if (error?.response?.data?.status === 400) {
          // notify(error?.response?.data?.guideMessage);
        }
      },
    });
  
}