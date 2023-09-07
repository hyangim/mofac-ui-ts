import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';

import { useTranscoord } from '../api/Transcoord';



interface LocationInfo{
  longitude:number,
  latitude: number,
}



function TestPage() {

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({longitude:0, latitude:0});
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
    setLocationInfo({
      longitude : pos.coords.longitude,
      latitude: pos.coords.latitude
    })
  });
  },[]);

  console.log('locationInfo'+locationInfo);
  const res = useTranscoord( locationInfo.longitude, locationInfo.latitude );
  debugger;
  if (res.isLoading) {
    // return <span>Loading...</span>
    return <span>처리중...</span>
  }

  if (res.isError) {
    return <span>Error</span>
  }
  if(res.isSuccess && res.data.meta.total_count>0){  

    // const fetchtempData  = async (name:string) => {

    return (
      <div>
       <p>x:{res.data.documents[0].x}</p>    
       <p>y:{res.data.documents[0].y}</p>    
      </div>
    );
    // const data = fetchtempData("서울");
    // console.log(data);
    //   return (
    //     <div>
    //           <li>This is page PageC</li>
    //     </div>
    //   );
  }else{
    return(
      <div></div>
    );
  }
  
}
  
export default TestPage;