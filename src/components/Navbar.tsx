import AdionaLogo from "../public/img/adiona.png"
import {ReactNode} from 'react';
import { Link } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import NotificationsIcon from '@mui/icons-material/Notifications';

import {Stack, Box,  Button, TextField, AppBar, Toolbar, InputAdornment, Avatar, 
  Badge, Drawer, CssBaseline, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, ListSubheader, IconButton, } from '@mui/material';

import menu from "../data/menu"

const Navbar = () => {

  const drawerWidth:number = 240;
  const navbarInputStyle:object = {
    "& .MuiInputLabel-root": {
      color: 'white',
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "white" },
      '&:hover': {borderColor: '#fff !important'},
    },

    display: { xs: 'none', md: 'none', lg: 'block' } 
  }

  const inputLabelProps = {
    style: { 
      color: '#fff', 
      fontSize:"10pt" }, 
  }
  const inputProps = {
    style: { 
      color: "#fff",
      borderColor:"#fff,",
      fontSize:"10pt"
    } ,
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon style={{ color: 'white' }}/>
      </InputAdornment>
    )
  }
    
  const renderMenu = ():ReactNode => {
    return(
      menu.map((section,sectionId)=>{
        return(
          <List component="nav" key={sectionId} subheader={
            <ListSubheader component="div" sx={{display:"flex", fontWeight:"bolder", color:"rgb(5,22,61)"}} >
              {section.title}
            </ListSubheader>
          }>
            {section.features.map((feature, featureIndex) => (
              //CORRECT (NEEDS TO BE USED)
              // <Link to={feature.link} style={{textDecoration:"none"}}> 
              //INCORRECT (USED ONLY FOR TESTING PURPOSES)
              <Link to={"/#"+feature.label} style={{textDecoration:"none"}} key={featureIndex}> 
                <ListItem  disablePadding sx={{color:"rgb(107,119,140)"}} >
                  <ListItemButton >
                    <ListItemIcon>
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText primary={feature.label} sx={{fontSize:"8pt !important"}} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        )
      })
    )
  }

  return (
    <>
      <CssBaseline />

      <AppBar position="fixed" sx={{ backgroundColor:"rgb(41,41,41)", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Stack spacing={2} direction="row" justifyContent="space-between"  alignItems="center" sx={{ flexGrow: 1}}>

            <Button>
              <img src={AdionaLogo} alt="logo"/>
            </Button>
          
            <Stack spacing={2} direction="row" alignItems="center">

              <TextField label="Booking" variant="outlined" size="small" InputLabelProps={inputLabelProps} InputProps={inputProps} sx={navbarInputStyle}/>
              <TextField label="Customer" variant="outlined" size="small" InputLabelProps={inputLabelProps} InputProps={inputProps} sx={navbarInputStyle}/>
              <TextField label="Product" variant="outlined" size="small" InputLabelProps={inputLabelProps} InputProps={inputProps} sx={navbarInputStyle}/>
              
              <IconButton aria-label="notifications">
                <Badge badgeContent={4} sx={{"& .MuiBadge-badge": {color: "white",backgroundColor: "red"}}}>
                  <NotificationsIcon fontSize="small" sx={{color:"white"}}/>
                </Badge>
              </IconButton>

              <BedtimeIcon fontSize="small"/>
              <Avatar sx={{ width: 24, height: 24, fontSize:12 }}>H</Avatar>

            </Stack>

          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }}}>
        <Toolbar />

        <Box sx={{ overflow: 'auto' }}>

          {renderMenu()}

        </Box>
      </Drawer>
      </>
  );
}

export default Navbar;