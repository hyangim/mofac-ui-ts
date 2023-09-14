import airApi from './CommonAxios'
import { useQuery } from '@tanstack/react-query';

interface ArpltnInfoProps {
numOfRows:number;
pageNo:number;
stationName: string;
}

const MsrstnAcctoRltmMesureDnsty  = async (stationName:string) => {
  const res = await airApi.getMsrstnAcctoRltmMesureDnsty(stationName);
  return res.data;
}

export const useMsrstnAcctoRltmMesureDnsty = (props: ArpltnInfoProps) => {

  return useQuery({
    queryKey: ['stationAirInfos', props.stationName],
    queryFn:()=> MsrstnAcctoRltmMesureDnsty(props.stationName),
    onError: (error: any) => {
      console.log('useCtprvnRltmMesureDnsty on Error:'+JSON.stringify(error));
    },
  });
  
}