// Modules
import { NavLink, useNavigate } from 'react-router-dom'



//Icons

import { FaHistory } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { CgProfile, CgSearch } from "react-icons/cg";



//Routes
import style from '../styles/SuperAdminDrawerNavigation.module.css'

export default function SuperAdminDrawerNavigation() {
    const navigate = useNavigate();
    return (
        <div className={style.SuperAdmindrawerNavBox}>
            <div className={style.logo}>
                <h1>ODTMS</h1>
            </div>
            <div className={style.SuperAdmindrawerNavBoxLinks}>
                <div className={style.links} ><li><NavLink className={style.aLogo} to={'/SuperAdminDashboard'}><RxDashboard color='white' /></NavLink></li> <span><NavLink className={style.a} to={'/SuperAdminDashBoard'}>Dashboard</NavLink></span></div>
                <div className={style.links} ><li><NavLink className={style.aLogo} to={'/SuperAdminEdit'}><CgProfile color='white' /></NavLink></li> <span><NavLink className={style.a} to={'/SuperAdminEdit'}>Admins</NavLink></span> </div>
                <div className={style.links} ><li><NavLink className={style.aLogo} to={'/SuperAdminHistory'}><FaHistory color='white' /></NavLink></li><span><NavLink className={style.a} to={'/SuperAdminHistory'}>History</NavLink></span> </div >
                <div className={style.links} ><li><NavLink className={style.aLogo} to={'/SuperAdminSearch'}><CgSearch color='white' /></NavLink></li><span><NavLink className={style.a} to={'/SuperAdminSearch'}>Search</NavLink></span> </div >
            </div >
            <div className={style.SuperAdmindrawerNavBoxFooter}>
                <div className={style.linksFooter}><li><NavLink className={style.aLogo} to={'/SuperAdminprofile'}><CgProfile color='white' /></NavLink></li> <span><NavLink className={style.a} to={'/SuperAdminprofile'}>My Profile</NavLink></span> </div>
                <div className={style.linksFooter} ><li><NavLink className={style.aLogo} to={''}><CgProfile color='white' /></NavLink></li>
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        navigate("/")
                    }}><NavLink className='a' to={''}>Logout</NavLink> </button></div>
            </div>

        </div >
    )
}