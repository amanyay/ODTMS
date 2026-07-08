/* eslint-disable react-hooks/rules-of-hooks */

//Style

import style from '../styles/EyeBankCss/EyeDonor.module.css'

//File

import DrawerNavigation from "../Components/DrawerNavigation"
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'

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
  const [error, setError] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [organ, setOrgan] = useState(0)
  const [bloodType, setBloodType] = useState('')
  const [gender, setGender] = useState('')
  const [location, setlocation] = useState('')




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


  async function AddNewDonor() {


    try {

      if (firstName === '' || lastName === '' || age === '' || phoneNumber === '' || gender === '' || bloodType === '' || organ === 0 || location === '') {

        setError('Please fill all field')
      }
      else if (firstName !== '' || lastName === '' || age === '' || phoneNumber !== '' || gender !== '' || bloodType !== '' || organ !== 0 || location !== '') {

        const request = await axios.post(`${baseUrl}/eyeBankAdminAddDonor`, { firstName, lastName, age, phoneNumber, gender, bloodType, organ, location })

        if (request.status === 200) {
          setError(request.data.message);
        }
        else if (request.status === 201) {
          setError(request.data.message)
        }

      }





    } catch (error) {
      console.log(error)
    }


  }

  async function DeleteDonor(item: Donor) {


    try {

      const request = await axios.post(`${baseUrl}/eyeBankDeleteDonors`, { donorPhoneNumber: item.phone_numbers })
      if (request.status === 200) {
        setError(request.data.message)
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
          <h2>{error}</h2>
          <div>
            <button><NavLink to='/Search'>Search</NavLink></button>
          </div>

        </div>
        <div className={style.section2}>
          <div className={style.title}>
            <span>ID</span>
            <span>First Name</span>
            <span>Last Name</span>
            <span>Age</span>
            <span>Phone Number</span>
            <span>Gender</span>
            <span>Blood Type</span>
            <span>Organ Name</span>
            <span>Location</span>
            <span>Donation Date</span>
            <span>Status</span>
            <span></span>
          </div>
          <div className={style.addInputs} >
            <span></span>
            <input placeholder='First Name' onChange={(e) => { setFirstName(e.target.value) }} />
            <input placeholder='Last Name' onChange={(e) => { setLastName(e.target.value) }} />
            <input placeholder='Age' onChange={(e) => { setAge(e.target.value) }} />
            <input placeholder='Phone Number' onChange={(e) => { setPhoneNumber(e.target.value) }} />
            <select value={gender}
              onChange={(e) => { setGender(e.target.value) }}>
              <option value="">Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <select value={bloodType}
              onChange={(e) => { setBloodType(e.target.value) }}>
              <option value="">Blood Type</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="AB+">AB+</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="O+">O+</option>
            </select>
            <select value={organ}
              onChange={(e) => { setOrgan(Number(e.target.value)) }}>
              <option value="">Organ</option>
              <option value="3">3.Eye</option>
            </select>
            <select value={location}
              onChange={(e) => { setlocation(e.target.value) }} >
              <option value="">Location</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Tigray">Tigray</option>
              <option value="Oromia">Oromia</option>
              <option value="Amhara">Amhara</option>
            </select>
            <span></span>
            <span>
              <button onClick={() => { AddNewDonor() }}>Add Donor</button>
            </span>
            <span></span>
          </div >
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
                return <li key={item.donation_id}>{item.age}</li>
              })}
            </span>

            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.phone_numbers}</li>
              })}
            </span>

            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.gender}</li>
              })}
            </span>
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}>{item.blood_type}</li>
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
            <span>
              {donors.map((item) => {
                return <li key={item.donation_id}><button onClick={() => { DeleteDonor(item) }}>Delete</button></li>
              })}
            </span>

          </div>) : (<div className={style.errorMessage}>{notFound}</div>)}

        </div>
      </div>
    </div>
  )
}
