/* eslint-disable react-hooks/set-state-in-effect */


//Style

import style from '../styles/SuperAdminCss/superAdminhistory.module.css'

//File

import SuperAdminDrawerNavigation from '../Components/SuperAdminDrawerNavigation'
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"






export default function KidneyHistory() {

    type KidneyHistory = {
        id: number
        don_phone_number: string
        don_age: number
        don_first_name: string
        don_blood_type: string
        rec_phone_number: string
        rec_age: number
        rec_first_name: string
        rec_blood_type: string
        date: string;
        status: string;
        organ_id: number;
    };

    const [KidneyHistory, setKidneyHistory] = useState<KidneyHistory[]>([])
    const [notFound, setNotFound] = useState('')


    async function superAdminHistory() {

        try {


            const request = await axios.post(`${baseUrl}/superAdminHistory`)
            if (request.status === 200) {
                setKidneyHistory(request.data.message)

            } else if (request.status === 201) {
                setNotFound("There is no history")
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => { superAdminHistory() }, [])



    return (
        <div className={style.KidneyHistoryMainBox} >
            <SuperAdminDrawerNavigation />
            <div className={style.KidneyHistoryInfoBox} >
                {/* <div className={style.sectionStart}>

                </div> */}
                <div className={style.section1} >
                    <h3>All Medical History</h3>

                    <div>

                    </div>
                </div >
                <div className={style.section2} >
                    <div className={style.title} >
                        <span>Donor Phone</span>
                        <span>Donor Name</span>
                        <span>D Blood type</span>
                        <span>Donor Age</span>
                        <span>Recipent Phone</span>
                        <span>Recipent Name</span>
                        <span>R Blood type</span>
                        <span>Recipent Age</span>
                        <span>Date</span>
                        <span>Status</span>

                    </div >
                    {
                        KidneyHistory.length > 0 ?
                            (<div className={style.KidneyHistoryData}>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.don_phone_number}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.don_first_name}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.don_blood_type}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.don_age}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.rec_phone_number}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.rec_first_name}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.rec_blood_type}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{item.rec_age}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={style.li} key={item.id}>{new Date(item.date).toLocaleDateString()}</li>
                                    })}
                                </span>
                                <span>
                                    {KidneyHistory.map((item) => {
                                        return <li className={item.status === 'Completed' ? (style.status) : (style.statusPending)} key={item.id}>{item.status}</li>
                                    })}
                                </span>



                            </div>) : (<div className={style.errorMessage} > {notFound}</div >)
                    }

                </div >
            </div >
        </div >
    )
}
