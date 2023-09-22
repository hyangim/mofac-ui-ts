import { useQuery } from '@tanstack/react-query';
import MofacAxios from './MofacAxios';

const User  = async (name: string) => {  
    const res = await MofacAxios.getUser(name);
    console.log('Mofac res:'+JSON.stringify(res));
    return res.data;
    
}

export const useUser = (name: string) => {
    
    return useQuery({
      queryKey: ['User', name],
      queryFn:()=> User(name),
      onError: (error: any) => {
        console.log('useUser on Error:'+JSON.stringify(error))
        if (error?.response?.status === 400) {
          // alert('400 error'+error?.message);
          console.log('400 error'+error?.message);
          // notify(error?.response?.data?.guideMessage);
        }
      },
    });
  
}