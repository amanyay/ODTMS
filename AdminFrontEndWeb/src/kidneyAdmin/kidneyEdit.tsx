/* eslint-disable react-hooks/set-state-in-effect */

//Style

import style from '../styles/kidneyCSS/kidneyEdit.module.css'

//File
import KidneyDrawerNavigation from '../Components/KidneyDrawerNavigation'
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
export default function KidneyOrgan() {

  type KidneyOrgan = {
    organ_id: number;
    organ_name: string;
    organ_date: string;
    amount: number;
    statuss: string;
    organ_amount: number

  };
  const [KidneyOrgan, setKidneyOrgan] = useState<KidneyOrgan[]>([])
  const [notFound, setNotFound] = useState('')

  async function KidneyOrganInfo() {

    try {


      const request = await axios.post(`${baseUrl}/KidneyOrganAdmin`)
      if (request.status === 200) {
        setKidneyOrgan(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No Organ found")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    KidneyOrganInfo();
  }, [])

  return (
    <div className={style.KidneyOrganMainBox}>
      <KidneyDrawerNavigation />
      <div className={style.KidneyOrganInfoBox}>
        <div className={style.section1}>
          <h3>Kidney Organ</h3>
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
          {KidneyOrgan.length > 0 ?
            (<div className={style.KidneyOrganData}>
              <span>
                {KidneyOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.organ_id}</li>
                })}
              </span>
              <span>
                {KidneyOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.organ_name}</li>
                })}
              </span>
              <span>
                {KidneyOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.organ_amount}</li>
                })}
              </span>
              <span>
                {KidneyOrgan.map((item) => {
                  return <li key={item.organ_id}>{item.statuss}</li>
                })}
              </span>


            </div>) : (<div className={style.errorMessage}>{notFound}</div>)}

        </div>
      </div>
    </div>
  )
}
