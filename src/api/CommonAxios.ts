import axios from 'axios';
import {AIR_BASE_URL, serviceKey} from '../common/global';

const api = axios.create({
	baseURL: AIR_BASE_URL,
    params : {
        returnType : 'json',
        ver : '1.0',        
	},
	// timeout: 1000
})

api.interceptors.request.use(
    (config) => {
        // 요청 바로 직전
        // axios 설정값에 대해 작성합니다.
    //   config.headers['Content-Type'] = 'application/json';   

        return config;
    },
    (error) => {
        // 요청 에러 처리를 작성합니다.
        console.log(`commonAxios requst error ${error}`);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
(response) => {
    //특정 에러일때 에러페이지로 이동
    return response;
},
async (error) => {
    console.log(`commonAxios requst error ${error}`);
    return Promise.reject(error);
}
);

// export default api;

const airApi = {
    getCtprvnRltmMesureDnsty : (sidoName:any) => api.get('/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey='+serviceKey,{
        params : {
            sidoName : sidoName,
            pageNo : 1,
            numOfRows : 100,     
        }
    }),
    getMsrstnAcctoRltmMesureDnsty : (stationName:any) => api.get('/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey='+serviceKey,{
        params : {
            stationName : stationName,
            pageNo : 1,
            numOfRows : 100,   
            dataTerm: 'DAILY',
        }
    }),
    getMsrstnList : (addr:any) => api.get('/B552584/MsrstnInfoInqireSvc/getMsrstnList?serviceKey='+serviceKey,{
        params : {
            addr : addr,
            pageNo : 1,
            numOfRows : 100,
        }
    }),
    getMinuDustFrcstDspth : (searchDate:any) => api.get('B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey='+serviceKey,{
        params : {
            searchDate : searchDate,
            pageNo : 1,
            numOfRows : 100,
        }
    }), 
}

export default airApi;

