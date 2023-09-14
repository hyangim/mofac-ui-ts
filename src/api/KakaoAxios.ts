import axios from 'axios';
import {CACAO_BASE_URL, REST_API_KEY} from '../common/global';

const api2 = axios.create({
	baseURL: CACAO_BASE_URL,
    params : {   
	},
	// timeout: 1000
})

api2.interceptors.request.use(
    (config) => {
        // 요청 바로 직전
        // axios 설정값에 대해 작성합니다.

      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `KakaoAK ${REST_API_KEY}`;

        return config;
    },
    (error) => {
        // 요청 에러 처리를 작성합니다.
        console.log(`KakaoAxios requst error ${error}`);
        return Promise.reject(error);
    }
);

api2.interceptors.response.use(
    (response) => {
        //특정 에러일때 에러페이지로 이동
        return response;
    },
    async (error) => {  
        console.log(`KakaoAxios response error ${error}`);  
        return Promise.reject(error);    
    }
);

// export default api;

const kakaoApi = {   
    getTranscoord : (longitude:any, latitude:any) => api2.get('v2/local/geo/transcoord.json',{
        params : {
            x : longitude,
            y : latitude,
            input_coord : 'WGS84',
            output_coord : 'TM',
        }
    }),
}

export default kakaoApi;

