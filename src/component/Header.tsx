import React, {useContext}  from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HouseIcon from '@mui/icons-material/House';
import RestoreIcon from "@mui/icons-material/Restore"; //주간예보
import ApartmentIcon from '@mui/icons-material/Apartment'; //시도별
import LocationOnIcon from "@mui/icons-material/LocationOn"; //측정소
import AirIcon from '@mui/icons-material/Air';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import AuthContext from '../store/auth-context';
import PortraitTwoToneIcon from '@mui/icons-material/PortraitTwoTone';
import Icon from '@mui/material/Icon';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  function getIcon(name:string){  
    switch(name){
      case "HouseIcon":
        return <HouseIcon/>;
      case "ApartmentIcon":
        return <ApartmentIcon/>;
      case "AirIcon":
        return <AirIcon/>;
      case "LocationOnIcon":
        return <LocationOnIcon/>;
      case "AcUnitIcon":
        return <AcUnitIcon/>;        
      case "RestoreIcon":
        return <RestoreIcon/>;        
      default:
        return <AcUnitIcon/>;
    }  
  }

  function handleClick(idx:number){
    navigate(sections[idx].url);
  }

  function goLoginPage(){
    navigate("/login");
  }

  function goLogOut(){
    authCtx.logout();
  }

  function goMyPage(){
    navigate("/mypage");
  }

  function AuthButtion(){
      if(!authCtx.isLoggedIn){
        return(<button onClick={goLoginPage}>로그인</button>);
      }else{
        return(
          <div>
            <a href="#" onClick={goMyPage}><PortraitTwoToneIcon/></a>
            <button onClick={goLogOut}>로그아웃</button>
          </div>
        );
      }
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Button size="small">Subscribe</Button> */}
        <AuthButtion />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
      </Toolbar>
      {/* <Box sx={{ width: 500 }}> */}
      <Box>      
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleClick(newValue);
          }}
        >
          {sections.map((section:any, idx:number) => (
            <BottomNavigationAction label={section.title} icon={getIcon(section.icon)} key={idx}>
            </BottomNavigationAction>
          ))}
        </BottomNavigation>        
      </Box>
    </React.Fragment>
  );
}
