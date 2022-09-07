import {MenuGroup} from "../types"
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

const menu: MenuGroup[] = [
  {
    title:"WEB",
    features:[
      {
        label:"Layout",
        icon: <PersonalVideoIcon/>,
        link:"/"
      }
    ]
  },
  {
    title:"PRODUCTS",
    features:[
      {
        label:"Products",
        icon: <ShoppingBasketIcon/>,
        link:"/"
      },
      {
        label:"Departures",
        icon: <FlightTakeoffIcon/>,
        link:"/"
      },
      {
        label:"Flights",
        icon: <AirplanemodeActiveIcon/>,
        link:"/"
      }
    ]
  },
  {
    title:"BOOKINGS",
    features:[
      {
        label:"Bookings",
        icon: <EventNoteIcon/>,
        link:"/"
      },
      {
        label:"Carts",
        icon: <ShoppingCartIcon/>,
        link:"/"
      },
      {
        label:"Clients",
        icon: <AccountBoxIcon/>,
        link:"/"
      },{
        label:"Payments",
        icon: <CreditCardIcon/>,
        link:"/"
      },
      {
        label:"Wallets",
        icon: <AccountBalanceWalletIcon/>,
        link:"/"
      }
    ]
  },
  {
    title:"PROVIDERS",
    features:[
      {
        label:"Providers",
        icon: <PhoneIcon/>,
        link:"/"
      },
      {
        label:"Services",
        icon: <RoomSreviceIcon/>,
        link:"/"
      },
      {
        label:"Groups",
        icon: <GroupIcon/>,
        link:"/"
      },{
        label:"Hotels",
        icon: <HotelIcon/>,
        link:"/"
      },
      {
        label:"Others",
        icon: <MoreHorizIcon/>,
        link:"/"
      }
    ]
  },
]

export default menu