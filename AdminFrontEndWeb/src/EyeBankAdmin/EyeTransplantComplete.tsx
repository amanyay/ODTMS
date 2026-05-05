/* eslint-disable react-hooks/set-state-in-effect */


//Style

import style from '../styles/EyeBankCss/EyeTransplant.module.css'

//File

import DrawerNavigation from "../Components/DrawerNavigation"
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"





export default function EyeTransplant() {

  type EyeTransplant = {

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

  const [EyeTransplant, setEyeTransplant] = useState<EyeTransplant[]>([])
  const [notFound, setNotFound] = useState('')
  const [approvedMessage, setApprovedMessage] = useState('')

  async function EyeTransplantInfo() {

    try {


      const request = await axios.post(`${baseUrl}/eyeBankTransplantComplete`)
      if (request.status === 200) {
        setEyeTransplant(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No ready transplant")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => { EyeTransplantInfo() }, [])


  async function completeTransplant(item: EyeTransplant) {

    try {

      const request = await axios.post(`${baseUrl}/eyeBankTransplantCompleteApprove`, { rec_phone_number: item.rec_phone_number, don_phone_number: item.don_phone_number, requestId: item.id, status: item.status })
      if (request.status === 200) {
        setApprovedMessage('Successfull');
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className={style.EyeTransplantMainBox} >
      <DrawerNavigation />
      <div className={style.EyeTransplantInfoBox} >
        <div className={style.section1} >
          <h3>Manage Transplants</h3>
          <h2>{approvedMessage}</h2>
          <div>
            <button onClick={EyeTransplantInfo}>Filter</button>
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
            EyeTransplant.length > 0 ?
              (<div className={style.EyeTransplantData}>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.don_phone_number}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.don_first_name}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.don_blood_type}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.don_age}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.don_age}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_phone_number}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_first_name}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_blood_type}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_age}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <li key={item.id}>{item.rec_age}</li>
                  })}
                </span>
                <span>
                  {EyeTransplant.map((item) => {
                    return <button onClick={() => { completeTransplant(item) }}>Transplant Complete</button>
                  })}
                </span>


              </div>) : (<div className={style.errorMessage} > {notFound}</div >)
          }

        </div >
      </div >
    </div >
  )
}
