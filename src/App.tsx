import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes} from 'react-router-dom'
import Box from '@mui/material/Box';
import Main from './component/Main';
import Header from './component/Header';
import Footer from './component/Footer';
import CityAirInfo from './routes/CityAirInfo';
import StationAirInfo from './routes/StationAirInfo';
import PageC from './routes/PageC';
import {sections} from './common/global';


function App() {
  const posts = '메인 Post Text 입니다.';
  return (
    // <Container maxWidth="sm">
    <Container fixed>
      <CssBaseline />
      <Header title="대기 오염 정보를 제공합니다." sections={sections} />    
      {/* <Box sx={{ my: 4 }}>   */}
      <Box 
        sx={{
          width: '100%',
          backgroundColor: 'white',
        }}
      >
      <Routes>
        <Route path="/" element = {<Main title={sections[0].title} posts={posts} />}></Route>
        <Route path="/CityAirInfo" element = {<CityAirInfo  title={sections[1].title} />}></Route>
        <Route path="/StationAirInfo" element = {<StationAirInfo title={sections[2].title} />}></Route>
        <Route path="/pageC" element = {<PageC />}></Route>
      </Routes>
      </Box>
      <Footer
        description="Something here to give the footer a purpose!"
      /> 
    </Container>

  );
}

export default App;
