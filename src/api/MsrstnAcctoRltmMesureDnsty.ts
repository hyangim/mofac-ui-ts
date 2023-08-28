import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface ArpltnInfoProps {
numOfRows:number;
pageNo:number;
stationName: string;
}

export const MsrstnAcctoRltmMesureDnsty  = async (stationName:string) => {
    const baseUrl = "http://apis.data.go.kr"
    // const url = baseUrl+'/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=LFz9dGOoxUsdsRk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&returnType=json&numOfRows=10&pageNo=1&stationName='+stationName+'&dataTerm=DAILY&ver=1.0';
    const url = baseUrl+'/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&returnType=json&numOfRows=10&pageNo=1&stationName='+stationName+'&dataTerm=DAILY&ver=1.0';
    console.log('측정소별 조회:'+url);
    
    try{
        const res = await axios.get(url); 
        if(typeof res.data.response === "undefined"){
          alert("type error");
          throw  Error("type error!");
          // return errorRes;
        }else{
          return res.data.response.body.items;
        }
    }catch(error){
        console.log(error);
        return error;
    }
}

export const useMsrstnAcctoRltmMesureDnsty = (props: ArpltnInfoProps) => {

  return useQuery({
    queryKey: ['stationAirInfos', props.stationName],
    queryFn:()=> MsrstnAcctoRltmMesureDnsty(props.stationName),
      onError: (error: any) => {
        alert("onError"+error);
        if (error?.response?.data?.status === 400) {
          console.log('error?.response?.data?.status === 400');
        }
      },
  });
  
}