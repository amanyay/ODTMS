/* eslint-disable react-hooks/rules-of-hooks */
//Style

import style from '../styles/EyeBankCss/DashBoard.module.css'

//Files 
import DrawerNavigation from '../Components/DrawerNavigation'

//Icons
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../network/api';




export default function dahsboard() {



    type reportDatas = {

        total_user: string;
        verified_user: string;
        not_verified_user: string;
        total_donor: string;
        active_organ: string;
        active_donor: string;
        total_recipents: string;
        active_recipents: string;
        urgent_level_recipents: string;
        waitinglist_user: string;
        active_waitinglist_user: string;
        successfull_transplant: string;

    }
    type bloodGroupData = {

        blood_type: string;
        blood_group_amount: string;

    }


    const [notFound, setNotFound] = useState('')
    const [reports, setReports] = useState<reportDatas | null>(null)
    const [bloodTypeAmount, setBloodTypeAmount] = useState<bloodGroupData[]>([])
    const [successRate, setSuccessRate] = useState(Number)

    async function fetchReport() {

        try {

            const token = localStorage.getItem('token');


            const request = await axios.get(`${baseUrl}/eyeBankReport`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.status === 200) {
                setReports(request.data.report)
                setBloodTypeAmount(request.data.userBloodTypeAmount)
                setSuccessRate(request.data.successFullRate)
            }

        } catch (error) {
            console.log(error)
            if (error) {
                setNotFound('Unkown Error')
            }
        }


    }

    useEffect(() => {
        fetchReport();
    }, [])


    return (
        <div className={style.DashBoardMainBox} >
            <DrawerNavigation />
            <div className={style.DashBoardInfoBox}>

                <div className={style.sectionStart}>
                    <h4>{notFound}<button onClick={fetchReport}>Reload</button></h4>
                </div>

                <div className={style.section1}>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>{reports?.total_user}</p>
                        </div>

                        <h2>Total Users</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>{reports?.total_donor}</p>
                        </div>

                        <h2>Total Donor</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>{reports?.total_recipents}</p>
                        </div>

                        <h2>Total Recipents</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>{reports?.active_organ}</p>
                        </div>

                        <h2>Active Organs</h2>
                    </div>
                    <div className={style.section1Box}>
                        <div className={style.section1Boxs}>
                            <h1><FaUsers /></h1>
                            <p>{successRate} %</p>
                        </div>

                        <h2>Successfull Transplant</h2>
                    </div>
                </div>


                <div className={style.section2}>
                    <div className={style.section2Box}>
                        <div className={style.section2Box1}>
                            <h1>{reports?.verified_user} Users</h1>
                            <p>Verified National Id</p>
                        </div>
                        <hr />
                        <div className={style.section2Box1}>
                            <h1>{reports?.not_verified_user} Users</h1>
                            <p>Not verified users</p>
                        </div>
                    </div>

                    <div className={style.section2Box}>
                        <h2>Donor Analytics</h2>
                        <div className={style.section2Box2}>
                            <span>{reports?.total_donor}</span>
                            <p>Total Donor</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>{reports?.active_donor} </span>
                            <p>Active Donor</p>
                        </div>
                    </div>
                    <div className={style.section2Box}>
                        <h2>Recipent Analytics</h2>
                        <div className={style.section2Box2}>
                            <span>{reports?.total_donor}</span>
                            <p>Total Recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>{reports?.active_recipents} </span>
                            <p>Active Recipents</p>
                        </div>
                        <div className={style.section2Box2}>
                            <span>{reports?.urgent_level_recipents}</span>
                            <p> Urgent recipents</p>
                        </div>

                    </div>

                </div>
                <div className={style.section3}>
                    <div className={style.section3Box}>
                        <h2>By Blood Group</h2>

                        <div className={style.section3Box1}>
                            {bloodTypeAmount.map((index) => {
                                return <div>
                                    <p>{index.blood_type}</p>
                                    <span> {index.blood_group_amount}</span>
                                </div>
                            })}
                        </div>

                    </div>

                    <div className={style.section3Box}>
                        <h2>Active Waiting list user</h2>
                        <div className={style.section3Box2}>
                            <p>{reports?.active_waitinglist_user}</p>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}