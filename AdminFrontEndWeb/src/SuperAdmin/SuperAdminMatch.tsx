/* eslint-disable react-hooks/set-state-in-effect */


//Style

import style from '../styles/kidneyCSS/kidneyMatch.module.css'

//File

import SuperAdminDrawerNavigation from '../Components/SuperAdminDrawerNavigation'
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'




export default function KidneyMatch() {

  type KidneyMatch = {
    donation_id: number;
    don_organ_id: number;
    don_phone_number: string;
    don_status: string;
    donor_name: string;
    donor_blood_type: string;
    donor_age: number;
    organ_id: number;
    organ_name: string;
    recipient_name: string;
    recipient_blood_type: string;
    recipient_age: number;
    wait_id: number;
    rec_organ_id: number;
    rec_phone_number: string;
    rec_status: string;
    urgency_level: string;
    score: number
  };

  const [KidneyMatch, setKidneyMatch] = useState<KidneyMatch[]>([])
  const [notFound, setNotFound] = useState('')
  const [approvedMessage, setApprovedMessage] = useState('')

  async function KidneyMatchInfo() {

    try {


      const request = await axios.post(`${baseUrl}/kidneyMatchedOrgan`)
      if (request.status === 200) {
        setKidneyMatch(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No Match found")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => { KidneyMatchInfo() }, [])


  async function approveMatchedOrgan(item: KidneyMatch) {
    setNotFound('')
    try {

      const request = await axios.post(`${baseUrl}/KidneyBankAddToWaitingList`, { donorPhoneNumber: item.don_phone_number, recipentsPhoneNumber: item.rec_phone_number, organId: item.organ_id })
      if (request.status === 200) {
        setApprovedMessage('Successfully notify');
      }
      else if (request.status === 203) {
        setApprovedMessage(item.don_phone_number + " " + ' AND ' + " " + item.rec_phone_number + ' Request already sent');
      }
      else if (request.status === 201) {
        setApprovedMessage(request.data.message);
      }
      else if (request.status === 202) {
        setApprovedMessage(request.data.message);
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className={style.KidneyMatchMainBox} >
      <SuperAdminDrawerNavigation />
      <div className={style.KidneyMatchInfoBox} >
        <div className={style.section1} >
          <h3>Matched Organ</h3>
          <h2>{approvedMessage}</h2>
          <div>
            <button><NavLink to='/Search'>Search</NavLink></button>
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
            <span>Recipent status</span>
            <span>Match Score</span>
            <span></span>

          </div >
          {
            KidneyMatch.length > 0 ?
              (<div className={style.KidneyMatchData}>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.don_phone_number}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.donor_name}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.donor_blood_type}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.donor_age}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.rec_phone_number}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.recipient_name}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.recipient_blood_type}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.recipient_age}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.rec_status}</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li key={item.donation_id}>{item.score}%</li>
                  })}
                </span>
                <span>
                  {KidneyMatch.map((item) => {
                    return <li><button onClick={() => { approveMatchedOrgan(item) }}>Notify User</button></li>
                  })}
                </span>


              </div>) : (<div className={style.errorMessage} > {notFound}</div >)
          }

        </div >
      </div >
    </div >
  )
}
