import AdionaLogo from "../public/img/adiona.png"
import {ReactNode} from 'react';
import { Link } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomSreviceIcon from '@mui/icons-material/RoomService';
import GroupIcon from '@mui/icons-material/Group';
import HotelIcon from '@mui/icons-material/Hotel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {Stack, Box,  Button, TextField, AppBar, Toolbar, InputAdornment, Avatar, 
  Badge, Drawer, CssBaseline, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, ListSubheader, IconButton, } from '@mui/material';

import {MenuGroup} from "../types"
import menu from "../data/menu"

const Navbar = () => {

  const drawerWidth:number = 240;
  const navbarInputStyle:object = {
    "& .MuiInputLabel-root": {color: 'white'},//styles the label
    "& .MuiOutlinedInput-root": {
      "& > fieldset": { borderColor: "white" },
    },
    display: { xs: 'none', md: 'none', lg: 'block' } 
  }
  // const menu: MenuGroup[] = [
  //   {
  //     title:"WEB",
  //     features:[
  //       {
  //         label:"Layout",
  //         icon: <PersonalVideoIcon/>,
  //         link:"/"
  //       }
  //     ]
  //   },
  //   {
  //     title:"PRODUCTS",
  //     features:[
  //       {
  //         label:"Products",
  //         icon: <ShoppingBasketIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Departures",
  //         icon: <FlightTakeoffIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Flights",
  //         icon: <AirplanemodeActiveIcon/>,
  //         link:"/"
  //       }
  //     ]
  //   },
  //   {
  //     title:"BOOKINGS",
  //     features:[
  //       {
  //         label:"Bookings",
  //         icon: <EventNoteIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Carts",
  //         icon: <ShoppingCartIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Clients",
  //         icon: <AccountBoxIcon/>,
  //         link:"/"
  //       },{
  //         label:"Payments",
  //         icon: <CreditCardIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Wallets",
  //         icon: <AccountBalanceWalletIcon/>,
  //         link:"/"
  //       }
  //     ]
  //   },
  //   {
  //     title:"PROVIDERS",
  //     features:[
  //       {
  //         label:"Providers",
  //         icon: <PhoneIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Services",
  //         icon: <RoomSreviceIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Groups",
  //         icon: <GroupIcon/>,
  //         link:"/"
  //       },{
  //         label:"Hotels",
  //         icon: <HotelIcon/>,
  //         link:"/"
  //       },
  //       {
  //         label:"Others",
  //         icon: <MoreHorizIcon/>,
  //         link:"/"
  //       }
  //     ]
  //   },
  // ]
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