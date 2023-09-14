import { useQuery } from '@tanstack/react-query';
import airApi from './CommonAxios'

interface ArpltnInfoProps {
numOfRows:number;
pageNo:number;
sidoName: string;
}

const CtprvnRltmMesureDnsty  = async (sidoName:string) => {
  try{
    const res = await airApi.getCtprvnRltmMesureDnsty(sidoName);
    return res.data;
  }catch(error){
    throw  Error("CtprvnRltmMesureDnsty error!"+error);
  }
}

export const useCtprvnRltmMesureDnsty = (props: ArpltnInfoProps) => {

  return useQuery({
    queryKey: ['cityAirInfos', props.sidoName],
    queryFn:()=> CtprvnRltmMesureDnsty(props.sidoName),
    onError: (error: any) => {
      console.log('useCtprvnRltmMesureDnsty on Error:'+JSON.stringify(error))      
    },
  });
  
}