/* eslint-disable react-hooks/rules-of-hooks */

//Style

import style from '../styles/EyeBankCss/EyeDonor.module.css'

//File

import DrawerNavigation from "../Components/DrawerNavigation"
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
export default function eyeDonor() {

  type Donor = {
    donation_id: number;
    phone_numbers: string;
    donation_date: string;
    status: string;
    first_name: string;
    last_name: string;
    age: number;
    blood_type: string;
    organ_name: string;
    location: string;
    gender: string;
  };
  const [donors, setDonor] = useState<Donor[]>([])
  const [notFound, setNotFound] = useState('')

  async function eyeDonorInfo() {

    try {


      const request = await axios.get(`${baseUrl}/eyeBankDonorAdmin`)
      if (request.status === 200) {
        setDonor(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No donors found")
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    eyeDonorInfo();
  }, [])

  return (
    <div className={style.eyeDonorMainBox}>
      <DrawerNavigation />
      <div className={style.eyeDonorInfoBox}>
        <div className={style.section1}>
          <h3>Eye Donor</h3>
          <div>
            <button onClick={eyeDonorInfo}>Filter</button>
            <button>Add New Donor</button>
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
          {donors.length > 0 ? (<div className={style.donorData}>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.donation_id}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.first_name}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.last_name}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.gender}</li>
              })}
            </span>

            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.age}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.blood_type}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.phone_numbers}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.organ_name}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.location}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{new Date(item.donation_date).toLocaleDateString()}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.status}</li>
              })}
            </span>

          </div>) : (<div className={style.errorMessage}>{notFound}</div>)}

        </div>
      </div>
    </div>
  )
}
