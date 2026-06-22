// Modules
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


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
import '../styles/DrawerNavigation.css'

export default function KidneyDrawerNavigation() {

    const navigate = useNavigate()
    return (
        <div className="drawerNavBox">
            <div className='logo'>
                <h1>ODTMS</h1>
            </div>
            <div className="drawerNavBoxLinks">
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyDashboard'}><RxDashboard color='white' /></NavLink></li> <p><NavLink className='a' to={'/KidneyDashBoard'}>Dashboard</NavLink></p> </div>
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyDonor'}><BiSolidDonateHeart color='white' /></NavLink></li> <p><NavLink className='a' to={'/KidneyDonor'}>Donors</NavLink></p> </div>
                <div className='links' ><li><NavLink className='aLogo' to={'/Kidneyrecipents'}><RiUserReceived2Fill color='white' /> </NavLink></li><p><NavLink className='a' to={'/Kidneyrecipents'}>Recipents</NavLink> </p></div>
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyEdit'}><CiEdit color='white' /></NavLink></li><p><NavLink className='a' to={'/KidneyEdit'}>Edit Organs</NavLink>  </p></div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyMatch'}><PiPlugsConnectedBold color='white' /></NavLink></li><p><NavLink className='a' to={'/KidneyMatch'}>Match organs</NavLink></p> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyRequest'}><BsQuestionOctagonFill color='white' /></NavLink></li><p><NavLink className='a' to={'/KidneyRequest'}>Waiting Lists</NavLink></p> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyTransplant'}><FaExchangeAlt color='white' /></NavLink></li><p><NavLink className='a' to={'/KidneyTransplant'}>Edit Transplant</NavLink></p> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/KidneyHistory'}><FaHistory color='white' /></NavLink></li><p><NavLink className='a' to={'/KidneyHistory'}>History</NavLink></p> </div >
            </div >
            <div className="drawerNavBoxFooter">
                <div className='linksFooter' ><li><NavLink className='aLogo' to={'/KidneyAdminprofile'}><CgProfile color='white' /></NavLink></li> <p><NavLink className='a' to={'/KidneyAdminprofile'}>My Profile</NavLink></p> </div>
                <button onClick={() => {
                    localStorage.removeItem('token')
                    navigate("/")
                }}>Logout </button>
            </div>

        </div >
    )
}