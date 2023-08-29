import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface ArpltnInfoProps {
numOfRows:number;
pageNo:number;
sidoName: string;
}

export const CtprvnRltmMesureDnsty  = async (sidoName:string) => {
    const baseUrl = "http://apis.data.go.kr"
    const url = baseUrl+'/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName='+sidoName+'&pageNo=1&numOfRows=100&returnType=json&serviceKey=LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&ver=1.0';
    // const url = baseUrl+'/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName='+sidoName+'&pageNo=1&numOfRows=100&returnType=json&serviceKey=LFz9dGOxxxoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&ver=1.0';
    try{
      const res = await axios.get(url); 
      console.log('CtprvnRltmMesureDnsty  res:'+JSON.stringify(res));
      if(typeof res.data.response === "undefined"){
        alert("type error");
        throw  Error("type error!");
        // return errorRes;
      }else{
        return res.data.response.body.items;
      }
  }catch(error){
      console.log(error);
      throw  Error("type error!");
  }
    // try{
    //     const res = await axios.get(url); 
    //     return res.data.response.body.items;
    // }catch(error){
    //     console.log(error);
    //     return error;
    // }
}

export const useCtprvnRltmMesureDnsty = (props: ArpltnInfoProps) => {

  return useQuery({
    queryKey: ['airInfos', props.sidoName],
    queryFn:()=> CtprvnRltmMesureDnsty(props.sidoName),
  });
  
}