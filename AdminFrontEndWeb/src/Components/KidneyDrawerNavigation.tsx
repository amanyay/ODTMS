// Modules
import { NavLink } from 'react-router-dom'



//Icons

import { RiUserReceived2Fill } from "react-icons/ri";
import { BiSolidDonateHeart } from "react-icons/bi";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { FaExchangeAlt, FaHistory } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";


//Routes
import '../styles/KidneyDrawerNavigation.css'

export default function KidneyDrawerNavigation() {
    return (
        <div className="drawerNavBox">
            <div className='logo'>
                <h1>ODTMS</h1>
            </div>
            <div className="drawerNavBoxLinks">
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyDashboard'}><RxDashboard color='white' /></NavLink></li> <span><NavLink className='a' to={'/KidneyDashBoard'}>Dashboard</NavLink></span> </div>
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyDonor'}><BiSolidDonateHeart color='white' /></NavLink></li> <span><NavLink className='a' to={'/KidneyDonor'}>Donors</NavLink></span> </div>
                <div className='links' ><li><NavLink className='aLogo' to={'/Kidneyrecipents'}><RiUserReceived2Fill color='white' /> </NavLink></li><span><NavLink className='a' to={'/Kidneyrecipents'}>Recipents</NavLink> </span></div>
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyEdit'}><CiEdit color='white' /></NavLink></li><span><NavLink className='a' to={'/KidneyEdit'}>Edit Organs</NavLink>  </span></div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyMatch'}><PiPlugsConnectedBold color='white' /></NavLink></li><span><NavLink className='a' to={'/KidneyMatch'}>Match organs</NavLink></span> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyRequest'}><BsQuestionOctagonFill color='white' /></NavLink></li><span><NavLink className='a' to={'/KidneyRequest'}>Waiting Lists</NavLink></span> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyTransplant'}><FaExchangeAlt color='white' /></NavLink></li><span><NavLink className='a' to={'/KidneyTransplant'}>Edit Transplant</NavLink></span> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyHistory'}><FaHistory color='white' /></NavLink></li><span><NavLink className='a' to={'/KidneyHistory'}>History</NavLink></span> </div >
            </div >
            <div className="drawerNavBoxFooter">
                <div className='linksFooter' ><li><NavLink className='aLogo' to={'/KidneyAdminprofile'}><CgProfile color='white' /></NavLink></li> <span><NavLink className='a' to={'/KidneyAdminprofile'}>My Profile</NavLink></span> </div>
                <div className='linksFooter' ><li><NavLink className='aLogo' to={'/Kidneyrecipents'}><CgProfile color='white' /></NavLink></li><span><NavLink className='a' to={'/Kidneyrecipents'}>Logout</NavLink> </span></div>
            </div>

        </div >
    )
}