import { useQuery } from '@tanstack/react-query';
import cacaoApi from './KakaoAxios';

const Transcoord  = async (longitude: number, latitude:number) => {  
    const res = await cacaoApi.getTranscoord(longitude, latitude);
    // console.log('Transcoord res:'+JSON.stringify(res));
    return res.data;
    
}

export const useTranscoord = (longitude: number, latitude:number) => {
    
    return useQuery({
      queryKey: ['TMInfo', longitude, latitude],
      queryFn:()=> Transcoord(longitude, latitude),
      onError: (error: any) => {
        console.log('useCtprvnRltmMesureDnsty on Error:'+JSON.stringify(error))
        if (error?.response?.status === 400) {
          // alert('400 error'+error?.message);
          console.log('400 error'+error?.message);
          // notify(error?.response?.data?.guideMessage);
        }
      },
    });
  
}