/* eslint-disable react-hooks/rules-of-hooks */

//Style

import style from '../styles/EyeBankCss/EyeRecipents.module.css'

//File

import DrawerNavigation from "../Components/DrawerNavigation"
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
export default function eyeRecipents() {

  type Recipents = {
    wait_id: number;
    phone_number: string;
    reg_date: string
    status: string;
    urgency_level: string;
    first_name: string;
    last_name: string;
    age: number;
    blood_type: string;
    organ_name: string;
    location: string;
    gender: string;
  };
  const [Recipents, setRecipents] = useState<Recipents[]>([])
  const [notFound, setNotFound] = useState('')
  async function eyeRecipentsInfo() {

    try {


      const request = await axios.get(`${baseUrl}/eyeBankRecipentAdmin`)
      if (request.status === 200) {
        setRecipents(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No Recipents found")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    eyeRecipentsInfo();
  }, [])

  return (
    <div className={style.eyeRecipentsMainBox}>
      <DrawerNavigation />
      <div className={style.eyeRecipentsInfoBox}>
        <div className={style.section1}>
          <h3>Eye Recipents</h3>
          <div>
            <button><NavLink to='/Search'>Search</NavLink></button>
          </div>
        </div>
        <div className={style.section2}>
          <div className={style.title}>
            <span>ID</span>
            <span>First Name</span>
            <span>Last Name</span>
            <span>Gender</span>
            <span>Age</span>
            <span>Blood Type</span>
            <span>Phone Number</span>
            <span>Organ Name</span>
            <span>Location</span>
            <span>Donation Date</span>
            <span>Status</span>
          </div>
          {Recipents.length > 0 ? (<div className={style.RecipentsData}>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.wait_id}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.first_name}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.last_name}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.gender}</li>
              })}
            </span>

            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.age}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.blood_type}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.phone_number}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.organ_name}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.location}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{new Date(item.reg_date).toLocaleDateString()}</li>
              })}
            </span>
            <span>
              {Recipents.map((item) => {
                return <li key={item.wait_id}>{item.status}</li>
              })}
            </span>

          </div>) : (<div className={style.errorMessage}>{notFound}</div>)}

        </div>
      </div>
    </div>
  )
}
