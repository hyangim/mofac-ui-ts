import airApi from './CommonAxios';
import { useQuery } from '@tanstack/react-query';

const MinuDustFrcstDspth  = async (searchDate:string) => { 
  const res = await airApi.getMinuDustFrcstDspth(searchDate);
  return res.data;
}

export const useMinuDustFrcstDspth = (searchDate: string) => {
    
  return useQuery({
    queryKey: ['MinuDustFrcstDspth', searchDate],
    queryFn:()=> MinuDustFrcstDspth(searchDate),
    onError: (error: any) => {
      console.log('useMinuDustFrcstDspth on Error:'+JSON.stringify(error));    
    },
  });
  
}