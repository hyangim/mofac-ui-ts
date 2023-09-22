import axios from 'axios';
// import config from '../config/config';
// const axiosApi = axios.create({
// 	baseURL: `${config.apiServer}/api`,
//     params : {   
// 	},
// 	// timeout: 1000
// })
const mofacApi = axios.create({
	baseURL: '/mofac/api',
    params : {   
	},
	// timeout: 1000
})

mofacApi.interceptors.request.use(
    (config) => {
        // 요청 바로 직전
        // axios 설정값에 대해 작성합니다.
      config.headers['Content-Type'] = 'application/json';
    //   config.headers['Access-Control-Allow-Credentials']= true;
    //   config.headers['Access-Control-Allow-Origin']= 'http://localhost:8080';
    //   config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie'; // select only the ones you need
    //   config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    //   config.headers['Authorization'] = `KakaoAK ${REST_API_KEY}`;

        return config;
    },
    (error) => {
        // 요청 에러 처리를 작성합니다.
        console.log(`mofacApi requst error ${error}`);
        return Promise.reject(error);
    }
);

mofacApi.interceptors.response.use(
    (response) => {
        //특정 에러일때 에러페이지로 이동
        return response;
    },
    async (error) => {  
        console.log(`mofacApi response error ${error}`);  
        return Promise.reject(error);    
    }
);


const MofacAxios = {   
    getUser : (name:string) => mofacApi.get('/getUser',{
        params : {
            name : name,
        }
    }),
}

export default MofacAxios;

