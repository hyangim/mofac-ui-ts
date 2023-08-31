import airApi from './CommonAxios';
import { useQuery } from '@tanstack/react-query';

const MinuDustFrcstDspth  = async (searchDate:string) => {  
  try{
    const res = await airApi.getMinuDustFrcstDspth(searchDate);   
    if(typeof res.data.response === "undefined"){    
      throw  Error("type error!");      // return errorRes;
    }else{
      return res.data;
    }
  }catch(error){
      console.log(error);
      return error;
  }
}

export const useMinuDustFrcstDspth = (searchDate: string) => {
    
  return useQuery({
    queryKey: ['MinuDustFrcstDspth', searchDate],
    queryFn:()=> MinuDustFrcstDspth(searchDate),
  });
  
}