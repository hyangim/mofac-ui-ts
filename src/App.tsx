import React, { useContext }  from 'react';
import './App.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, Navigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Header from './component/Header';
import Footer from './component/Footer';
import Main from './routes/Main';
import CityAirInfo from './routes/CityAirInfo';
import StationAirInfo from './routes/StationAirInfo';
import AirInfo from './routes/AirInfo';
import TestPage from './routes/TestPage';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import CreateAccount from './routes/CreateAccount';
import {sections} from './common/global';
import AuthContext from './store/auth-context';


function App() {
  const posts = '메인 Post Text 입니다.';
  const authCtx = useContext(AuthContext);
  return (
    <Container fixed>
      <CssBaseline />
      <Header title="대기 오염 정보를 제공합니다." sections={sections} />    
      <Box 
        sx={{
          width: '100%',
          backgroundColor: 'white',
        }}
      >
      <Routes>
        <Route path="/" element = {<Main title={sections[0].title} posts={posts} />}></Route>
        <Route path="/cityAirInfo" element = {<CityAirInfo  title={sections[1].title} />}></Route>
        <Route path="/stationAirInfo" element = {<StationAirInfo title={sections[2].title} />}></Route>
        <Route path="/airInfo" element = {<AirInfo title={sections[3].title} />}></Route>
        <Route path="/testPage" element = {<TestPage />}></Route>
        <Route path="/login" element = {!authCtx.isLoggedIn ? <Login /> : <Navigate to='/mypage' />}></Route>
        <Route path="/mypage" element = {!authCtx.isLoggedIn ?  <Navigate to='/login' /> : <MyPage />}></Route>
        <Route path="/createAccount" element = {!authCtx.isLoggedIn ? <CreateAccount /> : <Navigate to='/' />}></Route>
      </Routes>
      </Box>
      <Footer
        description="Something here to give the footer a purpose!"
      /> 
    </Container>

  );
}

export default App;
