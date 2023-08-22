import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import instance from '../api/CommonAxios';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface MainProps {
  posts:string;
  title: string;
}

async function getUnityAirEnvrnIdexSnstiveAboveMsrstnList(sidoName: String){
  const _params = "/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=%EC%84%9C%EC%9A%B8&pageNo=1&numOfRows=100&returnType=json&serviceKey=LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&ver=1.0";
  try {
    // 위에서 지정한 baseURL 뒤에 다음 URL이 붙는다.
    const result = await instance.get(_params);
    console.log(result);
    debugger;
    return result.data.response.body.items;
  } catch (error) {
    console.log(error);
  }
}

const fetchtempData  = async (name:string) => {
  const baseUrl = "http://apis.data.go.kr"
  const url = baseUrl+'/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName='+name+'&pageNo=1&numOfRows=100&returnType=json&serviceKey=LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D&ver=1.0';
  
  try{
    const res = await axios.get(url);  
    // return res.data;
    debugger;
    console.log(res.data.response.body.items);
    return res.data.response.body.items;
  }catch(error){
    console.log(error);
    return error;
  }
}


export default function Main(props: MainProps) {
  const { posts, title } = props;
  const [airInfos, setAirInfos] = React.useState([]);
  const [point, setPoint] = React.useState(0);
  

  const name = '서울';

  const { isLoading, isError, data: productInfo  } = useQuery({
    queryKey: ['productInfo', name],
    queryFn:()=> fetchtempData(name),
  })

  useEffect(()=>{
    setPoint(0);
    document.title = '대기정보';
    console.log("useEffect() 호출");
  },[]);

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error</span>
  }


  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <li>{posts}</li>      
      <div>          
        <div>대기실  리스트 페이지 입니다.{point}</div>
        {productInfo?.map(function (airInfo: any, index: number) {
            return (
            <div key = {index}>              
                <div>
                <span>{airInfo.sidoName}</span>
                <span>{airInfo.stationName}</span>                
                </div>
            </div>
            );
        })}
      </div>
    </Grid>
  );
}
