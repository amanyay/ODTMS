/* eslint-disable react-hooks/set-state-in-effect */


//Style

import style from '../styles/EyeBankCss/EyeRequest.module.css'

//File

import DrawerNavigation from "../Components/DrawerNavigation"
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'




export default function EyeRequest() {

  type EyeRequest = {

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

  const [EyeRequest, setEyeRequest] = useState<EyeRequest[]>([])
  const [notFound, setNotFound] = useState('')
  const [approvedMessage, setApprovedMessage] = useState('')

  async function EyeRequestInfo() {

    try {


      const request = await axios.post(`${baseUrl}/eyeBankRequest`)
      if (request.status === 200) {
        setEyeRequest(request.data.message)
      } else if (request.status === 201) {
        setNotFound("There is no approved organ added to waiting list")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => { EyeRequestInfo() }, [])


  async function readyForTransplant(item: EyeRequest) {

    try {

      const request = await axios.post(`${baseUrl}/eyeBankRequestApprove`, { requestId: item.id, status: item.status, don_phone_number: item.don_phone_number, rec_phone_number: item.rec_phone_number })
      if (request.status === 200) {
        setApprovedMessage('Successfull');
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className={style.EyeRequestMainBox} >
      <DrawerNavigation />
      <div className={style.EyeRequestInfoBox} >
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
            EyeRequest.length > 0 ?
              (<div className={style.EyeRequestData}>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.don_phone_number}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.don_first_name}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.don_blood_type}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.don_age}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.don_age}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.rec_phone_number}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.rec_first_name}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.rec_blood_type}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.rec_age}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
                    return <li key={item.id}>{item.status}</li>
                  })}
                </span>
                <span>
                  {EyeRequest.map((item) => {
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
