/* eslint-disable react-hooks/set-state-in-effect */


//Style

import style from '../styles/kidneyCSS/kidneyRequest.module.css'

//File
import SuperAdminDrawerNavigation from '../Components/SuperAdminDrawerNavigation'
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'




export default function KidneyRequest() {

  type KidneyRequest = {

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

  const [KidneyRequest, setKidneyRequest] = useState<KidneyRequest[]>([])
  const [notFound, setNotFound] = useState('')
  const [approvedMessage, setApprovedMessage] = useState('')

  async function KidneyRequestInfo() {

    try {


      const request = await axios.post(`${baseUrl}/KidneyRequest`)
      if (request.status === 200) {
        setKidneyRequest(request.data.message)
      } else if (request.status === 201) {
        setNotFound("There is no approved organ added to waiting list")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => { KidneyRequestInfo() }, [])


  async function readyForTransplant(item: KidneyRequest) {

    try {

      const request = await axios.post(`${baseUrl}/KidneyRequestApprove`, { requestId: item.id, status: item.status })
      if (request.status === 200) {
        setApprovedMessage('Successfull');
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className={style.KidneyRequestMainBox} >
      <SuperAdminDrawerNavigation />
      <div className={style.KidneyRequestInfoBox} >
        <div className={style.section1} >
          <h3>Waiting List</h3>
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
            <span>Donor Status</span>
            <span>Recipent Id</span>
            <span>Recipent Name</span>
            <span>R Blood type</span>
            <span>Recipent Age</span>
            <span>Recipent status</span>
            <span></span>

          </div >
          {
            KidneyRequest.length > 0 ?
              (<div className={style.KidneyRequestData}>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.don_phone_number}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.don_first_name}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.don_blood_type}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.don_age}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.don_age}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.rec_phone_number}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.rec_first_name}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.rec_blood_type}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.rec_age}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <li key={item.id}>{item.status}</li>
                  })}
                </span>
                <span>
                  {KidneyRequest.map((item) => {
                    return <button onClick={() => { readyForTransplant(item) }}>Send To Transplant</button>
                  })}
                </span>


              </div>) : (<div className={style.errorMessage} > {notFound}</div >)
          }

        </div >
      </div >
    </div >
  )
}
