/* eslint-disable react-hooks/set-state-in-effect */


//Style

import style from '../styles/kidneyCSS/kidneyTransplant.module.css'

//File

import SuperAdminDrawerNavigation from '../Components/SuperAdminDrawerNavigation'
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'




export default function KidneyTransplant() {

  type KidneyTransplant = {

    rec_first_name: string;
    rec_age: number
    rec_location: string;
    rec_gender: string;
    rec_blood_type: string;
    don_first_name: string;
    don_age: number
    don_location: string;
    don_gender: string;
    don_blood_type: string;
    organ_name: string;
    id: number
    rec_phone_number: string;
    don_phone_number: string;
    organ_id: number
    status: string;
    date: string;

  };

  const [KidneyTransplant, setKidneyTransplant] = useState<KidneyTransplant[]>([])
  const [notFound, setNotFound] = useState('')
  const [approvedMessage, setApprovedMessage] = useState('')

  async function KidneyTransplantInfo() {

    try {


      const request = await axios.post(`${baseUrl}/KidneyTransplantComplete`)
      if (request.status === 200) {
        setKidneyTransplant(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No ready transplant")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => { KidneyTransplantInfo() }, [])


  async function completeTransplant(item: KidneyTransplant) {

    try {

      const request = await axios.post(`${baseUrl}/KidneyTransplantCompleteApprove`, { rec_phone_number: item.rec_phone_number, don_phone_number: item.don_phone_number, requestId: item.id, status: item.status })
      if (request.status === 200) {
        setApprovedMessage('Successfull');
      }
    } catch (error) {
      console.log(error)
    }

  }

  async function rejectTransplant(item: KidneyTransplant) {
    try {

      const request = await axios.post(`${baseUrl}/KidneyrejectTransplant`, { rec_phone_number: item.rec_phone_number, don_phone_number: item.don_phone_number, requestId: item.id, status: item.status })
      if (request.status === 200) {
        setApprovedMessage('Successfull');
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className={style.KidneyTransplantMainBox} >
      <SuperAdminDrawerNavigation />
      <div className={style.KidneyTransplantInfoBox} >
        <div className={style.section1} >
          <h3>Edit Admins</h3>
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
            <span>Recipent Id</span>
            <span>Recipent Name</span>
            <span>R Blood type</span>
            <span>Recipent Age</span>
            <span>Matching status</span>
            <span></span>
            <span></span>

          </div >
          {
            KidneyTransplant.length > 0 ?
              (<div className={style.KidneyTransplantData}>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.don_phone_number}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.don_first_name}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.don_blood_type}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.don_age}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_phone_number}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_first_name}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_blood_type}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_age}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_age}</li>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <button onClick={() => { completeTransplant(item) }}>Transplant Complete</button>
                  })}
                </span>
                <span>
                  {KidneyTransplant.map((item) => {
                    return <button onClick={() => { rejectTransplant(item) }}>Reject Transplant</button>
                  })}
                </span>


              </div>) : (<div className={style.errorMessage} > {notFound}</div >)
          }

        </div >
      </div >
    </div >
  )
}
