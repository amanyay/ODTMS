// Modules
import { NavLink, useNavigate } from 'react-router-dom'



//Icons

import { RiUserReceived2Fill } from "react-icons/ri";
import { BiSolidDonateHeart } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";


//Routes
import style from '../styles/SuperAdminDrawerNavigation.module.css'


export default function SuperAdminDrawerNavigation() {
    const navigate = useNavigate();
    return (
        <div className="drawerNavBox">
            <div className='logo'>
                <h1>ODTMS</h1>
            </div>
            <div className={style.SuperAdmindrawerNavBoxLinks}>
                <div className='links' ><li><NavLink className='aLogo' to={'/SuperAdminDashboard'}><RxDashboard color='white' /></NavLink></li> <p><NavLink className='a' to={'/SuperAdminDashBoard'}>Dashboard</NavLink></p></div>
                <div className='links' ><li><NavLink className='aLogo' to={'/SuperAdminEdit'}><BiSolidDonateHeart color='white' /></NavLink></li> <p><NavLink className='a' to={'/SuperAdminEdit'}>Admins</NavLink></p> </div>
                <div className='links' ><li><NavLink className='aLogo' to={'/SuperAdminHistory'}><RiUserReceived2Fill color='white' /> </NavLink></li><p><NavLink className='a' to={'/SuperAdminHistory'}>History</NavLink></p> </div >
                <div className='links' ><li><NavLink className='aLogo' to={'/SuperAdminSearch'}><CiEdit color='white' /></NavLink></li><p><NavLink className='a' to={'/SuperAdminSearch'}>Search</NavLink></p> </div >
            </div >
            <div className="drawerNavBoxFooter">
                <div className='linksFooter' ><li><NavLink className='aLogo' to={'/SuperAdminprofile'}><CgProfile color='white' /></NavLink></li> <p><NavLink className='a' to={'/SuperAdminprofile'}>My Profile</NavLink></p> </div>
                <button onClick={() => {
                    localStorage.removeItem('token')
                    navigate("/")
                }}><NavLink className='a' to={''}>Logout</NavLink> </button>

            </div>

        </div >
    )
}