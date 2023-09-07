import * as React from 'react';
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
      </Toolbar>
      <Box sx={{ width: 500 }}>
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
