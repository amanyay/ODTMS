/* eslint-disable react-hooks/rules-of-hooks */

//Style

import style from '../styles/EyeBankCss/EyeEdit.module.css'

//File

import DrawerNavigation from "../Components/DrawerNavigation"
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
export default function eyeOrgan() {

  type eyeOrgan = {
    organ_id: number;
    organ_name: string;
    organ_date: string;
    amount: number;
    statuss: string;
    organ_amount: number

  };
  const [eyeOrgan, seteyeOrgan] = useState<eyeOrgan[]>([])
  const [notFound, setNotFound] = useState('')

  async function eyeOrganInfo() {

    try {


      const request = await axios.get(`${baseUrl}/eyeBankOrganAdmin`)
      if (request.status === 200) {
        seteyeOrgan(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No Organ found")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    eyeOrganInfo();
  }, [])

  return (
    <div className={style.eyeOrganMainBox}>
      <DrawerNavigation />
      <div className={style.eyeOrganInfoBox}>
        <div className={style.section1}>
          <h3>Eye Organ</h3>
          <div>

          </div>
        </div>
        <div className={style.section2}>
          <div className={style.title}>
            <span>Organ ID</span>
            <span>Organ Name</span>
            <span>Amount</span>
            <span>Status</span>

          </div>
          {eyeOrgan.length > 0 ?
            (<div className={style.eyeOrganData}>
              <span>
                {eyeOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.organ_id}</li>
                })}
              </span>
              <span>
                {eyeOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.organ_name}</li>
                })}
              </span>
              <span>
                {eyeOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.organ_amount}</li>
                })}
              </span>
              <span>
                {eyeOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.statuss}</li>
                })}
              </span>


            </div>) : (<div className={style.errorMessage}>{notFound}</div>)}

        </div>
      </div>
    </div>
  )
}
