import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore"; //주간예보
import ApartmentIcon from '@mui/icons-material/Apartment'; //시도별
import LocationOnIcon from "@mui/icons-material/LocationOn"; //측정소
import AirIcon from '@mui/icons-material/Air';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

const sections = [
  { title: '주간예보', url: '/' , icon: 'RestoreIcon'},
  { title: '시도별', url: '/CityAirInfo', icon: 'ApartmentIcon' },
  { title: '측정소별', url: '/StationAirInfo' , icon: 'LocationOnIcon'},
  { title: 'Business', url: '/pageC' , icon: 'AcUnitIcon'},
];

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  function getIcon(name:string){  
    switch(name){
      case "RestoreIcon":
        return <RestoreIcon/>;
      case "ApartmentIcon":
        return <ApartmentIcon/>;
      case "AirIcon":
        return <AirIcon/>;
      case "LocationOnIcon":
        return <LocationOnIcon/>;
      case "AcUnitIcon":
        return <AcUnitIcon/>;        
      default:
        return <AcUnitIcon/>;
    }  
  }

  function handleClick(idx:number){
    alert(sections[idx].url);
    navigate(sections[idx].url);
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Button size="small">Subscribe</Button> */}
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
        {/* <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button> */}
      </Toolbar>
      <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          alert(newValue);
          setValue(newValue);
          handleClick(newValue);
        }}
      >
      {sections.map((section:any, idx:number) => (
      //   <Link
      //   color="inherit"
      //   noWrap
      //   key={idx}
      //   variant="body2"
      //   href={section.url}
      //   sx={{ p: 1, flexShrink: 0 }}
      //   onClick={menuChange}
      //   underline="none"
      // >
        // <a href="section.url">
        <BottomNavigationAction label={section.title} icon={getIcon(section.icon)} >
        </BottomNavigationAction>
        // </a>
        // </Link>
      ))}
      </BottomNavigation>
    </Box>
      {/* <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section:any, idx:number) => (
          <Link
            color="inherit"
            noWrap
            key={idx}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
            onClick={menuChange}
            underline="none"
          >
            {section.title}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
  );
}
