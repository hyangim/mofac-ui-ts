import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Main from './component/Main';
import Header from './component/Header';
import Footer from './component/Footer';


const sections = [
  { title: '대기질 주간예보', url: '#' },
  { title: '시도별 실시간 측정', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Travel', url: '#' },
];


function App() {
  const posts = '메인 Post Text 입니다.';
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Header title="대기 오염 정보를 제공합니다." sections={sections} />    
      <Box sx={{ my: 4 }}>      
      <Main title={sections[0].title} posts={posts} />
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Material UI Create React App example in TypeScript
        </Typography>
        <ProTip />
        <Copyright /> */}
      </Box>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> 
    </Container>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload....
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
