import axios from 'axios'

const BASE_URL = 'http://apis.data.go.kr'
// const instance = axios.create({
// 	baseURL: process.env.PUBLIC_URL,
// 	timeout: 1000
// })
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 1000
})

instance.interceptors.request.use(
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

instance.interceptors.response.use(
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

export default instance;