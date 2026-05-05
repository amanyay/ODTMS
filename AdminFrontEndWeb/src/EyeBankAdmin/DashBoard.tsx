/* eslint-disable react-hooks/rules-of-hooks */
//Style

import style from '../styles/EyeBankCss/DashBoard.module.css'

//Files 
import DrawerNavigation from '../Components/DrawerNavigation'

//Icons
import { FaUsers } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../network/api';




export default function dahsboard() {



    type reportDatas = {

        id: number

    }

    const [notFound, setNotFound] = useState('')
    const [reports, setReports] = useState<reportDatas[]>([])



    async function fetchReport() {

        try {


            const request = await axios.get(`${baseUrl}/eyeBankReport`);
            setReports(request.data.message)

        } catch (error) {
            console.log(error)
            if (error) {
                setNotFound('Unkown Error')
            }
        }


    }




    return (
        <div className={style.DashBoardMainBox} >
            <DrawerNavigation />
            <div className={style.DashBoardInfoBox}>

                <div className={style.sectionStart}>
                    <h4> {notFound} <button onClick={fetchReport}>Eye Bank Organ Reports</button></h4>
                </div>

                <div className={style.section1}>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>200</p>
                        </div>

                        <h2>Total Users</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>200</p>
                        </div>

                        <h2>Total Users</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>200</p>
                        </div>

                        <h2>Total Users</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>200</p>
                        </div>

                        <h2>Total Users</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>200</p>
                        </div>

                        <h2>Total Users</h2>
                    </div>
                </div>


                <div className={style.section2}>
                    <div className={style.section2Box}>
                        <div className={style.section2Box1}>
                            <h1>50 Users</h1>
                            <p>Verified National Id</p>
                        </div>
                        <hr />
                        <div className={style.section2Box1}>
                            <h1>40 Users</h1>
                            <p>Total Not verified users</p>
                        </div>
                    </div>

                    <div className={style.section2Box}>
                        <h2>Donor Analytics</h2>
                        <div className={style.section2Box2}>
                            <span>20 </span>
                            <p>Total recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>40 </span>
                            <p>Active recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>40</span>
                            <p> Transpant recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>20</span>
                            <p> Urgent recipents</p>
                        </div>
                    </div>
                    <div className={style.section2Box}>
                        <h2>Recipent Analytics</h2>
                        <div className={style.section2Box2}>
                            <span>20 </span>
                            <p>Total recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>40 </span>
                            <p>Active recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>40</span>
                            <p> Transpant recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>20</span>
                            <p> Urgent recipents</p>
                        </div>

                    </div>

                </div>
                <div className={style.section3}>
                    <div className={style.section3Box}>
                        <h3>By Blood group</h3>

                        <div className={style.section3Box1}>
                            <p>A</p>
                            <span>aasd</span>
                            <p>AB </p>
                            <span>aasd</span>
                            <p>B</p>
                            <span>aasd</span>
                            <p>B+ </p>
                            <span>aasd</span>
                            <p>O </p>
                            <span>aasd</span>
                        </div>

                        <hr />

                        <h3>By Age group</h3>
                        <div className={style.section3Box1}>
                            <p>{'>'}20 </p>
                            <span>aasd</span>
                            <p>{'>'} 20 </p>
                            <span>aasd</span>
                            <p>{'>'} 20 </p>
                            <span>aasd</span>
                        </div>
                    </div>

                    <div className={style.section3Box}>
                        <h2>Active Waiting list user</h2>
                        <div className={style.section3Box2}>
                            <p>230000</p>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}