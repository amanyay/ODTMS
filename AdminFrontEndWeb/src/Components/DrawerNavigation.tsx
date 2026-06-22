// Modules
import { NavLink, useNavigate } from 'react-router-dom'



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

export default function DrawerNavigation() {

    const navigate = useNavigate();

    return (
        <div className="drawerNavBox">
            <div className='logo'>
                <h1>ODTMS</h1>
            </div>
            <div className="drawerNavBoxLinks">
                <div className='links' ><li><NavLink className='aLogo' to={'/EyeBankDashboard'}><RxDashboard color='white' /></NavLink></li> <p><NavLink className='a' to={'/EyebankDashBoard'}>Dashboard</NavLink></p> </div>
                <div className='links' ><li><NavLink className='aLogo' to={'/EyeDonor'}><BiSolidDonateHeart color='white' /></NavLink></li> <p><NavLink className='a' to={'/EyeDonor'}>Donors</NavLink></p> </div>
                <div className='links' ><li><NavLink className='aLogo' to={'/Eyerecipents'}><RiUserReceived2Fill color='white' /> </NavLink></li><p><NavLink className='a' to={'/Eyerecipents'}>Recipents</NavLink> </p></div>
                <div className='links' ><li><NavLink className='aLogo' to={'/EyeEdit'}><CiEdit color='white' /></NavLink></li><p><NavLink className='a' to={'/EyeEdit'}>Edit Organs</NavLink>  </p></div >
                <div className='links' ><li><NavLink className='aLogo' to={'/EyeMatch'}><PiPlugsConnectedBold color='white' /></NavLink></li><p><NavLink className='a' to={'/EyeMatch'}>Match organs</NavLink></p> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/EyeRequest'}><BsQuestionOctagonFill color='white' /></NavLink></li><p><NavLink className='a' to={'/EyeRequest'}>Waiting Lists</NavLink></p> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/EyeTransplant'}><FaExchangeAlt color='white' /></NavLink></li><p><NavLink className='a' to={'/EyeTransplant'}>Edit Transplant</NavLink></p> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/EyeHistory'}><FaHistory color='white' /></NavLink></li><p><NavLink className='a' to={'/EyeHistory'}>History</NavLink></p> </div >
            </div >
            <div className="drawerNavBoxFooter">
                <div className='linksFooter' ><li><NavLink className='aLogo' to={'/eyeAdminprofile'}><CgProfile color='white' /></NavLink></li> <p><NavLink className='a' to={'/eyeAdminprofile'}>My Profile</NavLink></p> </div>

                <button onClick={() => {
                    localStorage.removeItem('token')
                    navigate("/")
                }}>Logout </button>
            </div>


        </div >
    )
}