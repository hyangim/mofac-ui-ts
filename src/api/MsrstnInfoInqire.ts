import axios from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export const MsrstnInfoInqire  = async (addr:string) => {
    const baseUrl = "http://apis.data.go.kr"
    const url = baseUrl+'/B552584/MsrstnInfoInqireSvc/getMsrstnList?serviceKey=LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&returnType=json&numOfRows=100&pageNo=1&addr='+addr;    
    try{
        const res = await axios.get(url); 
        // console.log("station url:"+ url)
        // console.log(res);
        return res.data.response.body.items;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const useMsrstnInfoInqire = (addr: string) => {
    
  return useQuery({
    queryKey: ['stationNames', addr],
    queryFn:()=> MsrstnInfoInqire(addr),
  });
  
}