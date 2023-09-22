// 배포환경
const prod = {
    webServer: 'http://localhost:3000',
    apiServer: 'http://localhost:8080',
  };
  
  // local 개발용 설정
  const dev = {
    webServer: 'http://localhost:3000',
    apiServer: 'http://localhost:8080',
  }
  
  export default process.env.NODE_ENV === 'production' ? prod : dev;