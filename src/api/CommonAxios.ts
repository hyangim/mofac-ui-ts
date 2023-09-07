import axios from 'axios';
import {AIR_BASE_URL, serviceKey} from '../common/global';

// const instance = axios.create({
// 	baseURL: process.env.PUBLIC_URL,
// 	timeout: 1000
// })
const api = axios.create({
	baseURL: AIR_BASE_URL,
    params : {
        returnType : 'json',
		// serviceKey : 'LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D',
        ver : '1.0',        
	},
	// timeout: 1000
})

api.interceptors.request.use(
    (config) => {
        // 요청 바로 직전
        // axios 설정값에 대해 작성합니다.
        // getToken() - 클라이언트에 저장되어 있는 액세스 토큰을 가져오는 함수
    //   const accessToken = getToken();

    //   config.headers['Content-Type'] = 'application/json';
    //   config.headers['Authorization'] = `Bearer ${accessToken}`;

        return config;
    },
    (error) => {
        // 요청 에러 처리를 작성합니다.
        console.log(error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
(response) => {
    if (response.status === 404) {
    console.log('404 페이지로 넘어가야 함!');
    }

    return response;
},
async (error) => {
    if (error.response?.status === 401) {
    // isTokenExpired() - 토큰 만료 여부를 확인하는 함수
    // tokenRefresh() - 토큰을 갱신해주는 함수
    // if (isTokenExpired()) await tokenRefresh();

    // const accessToken = getToken();

    // error.config.headers = {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${accessToken}`,
    // };

    // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
    const response = await axios.request(error.config);
    return response;
    }
    return Promise.reject(error);
}
);

// export default api;

const airApi = {
    getCtprvnRltmMesureDnsty2 : (sidoName:any) => api.get('B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',{
        params : {
            sidoName : sidoName,
            pageNo : 1,
            numOfRows : 100,            
            serviceKey : 'LFz9dGOoxURk2A8NOe%2BtaBYrx8CyRSTixm0A46pa3tC%2Bwr2VwdO7O3Bpmt46s45nRukeFQfqA12oWocpDqH%2B9A%3D%3D',
            ver : '1.0',    
            returnType : 'json',        
        }
    }),
    getCtprvnRltmMesureDnsty3 : (sidoName:any) => api.get('/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName='+sidoName+'&pageNo=1&numOfRows=100&serviceKey='+serviceKey
    ),
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

