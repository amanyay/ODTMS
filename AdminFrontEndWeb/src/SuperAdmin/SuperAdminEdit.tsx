/* eslint-disable react-hooks/set-state-in-effect */



//Style

import style from '../styles/SuperAdminCss/SuperAdminAdminEdit.module.css'

//File

import SuperAdminDrawerNavigation from '../Components/SuperAdminDrawerNavigation'
import baseUrl from "../../network/api"

//Packages

import axios from "axios"
import { useEffect, useState } from "react"





export default function AllAdmins() {

  type AllAdmins = {

    admin_id: number;
    first_name: string;
    last_name: string;
    age: string;
    phone_number: number;
    email: number;
    blood_type: string;
    ID: number;
    location: string
    gender: string;
    hospital_code: string;
  };

  const [AllAdmins, setAllAdmins] = useState<AllAdmins[]>([])
  const [notFound, setNotFound] = useState('')
  const [approvedMessage, setApprovedMessage] = useState('')


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [gender, setGender] = useState('')
  const [location, setlocation] = useState('')
  const [password, setPassword] = useState('1234')
  const [hospitalId, setHospital] = useState(0)



  async function AllAdminsInfo() {

    try {


      const request = await axios.post(`${baseUrl}/superAdminFetchAdmins`)
      if (request.status === 200) {
        setAllAdmins(request.data.message)
      } else if (request.status === 201) {
        setNotFound("No Match found")
      }

    } catch (error) {
      console.log(error)
    }

  }

  async function AddNewAdmin() {

    setApprovedMessage('')

    try {
      if (firstName === "" || lastName === "" || age === "" || phoneNumber === "" || email === "" || bloodType === "" || gender === "" || location === '') {
        setApprovedMessage('Please fill all required')
      }

      else if (firstName !== "" || lastName !== "" || age !== "" || phoneNumber !== "" || email !== "" || bloodType !== "" || gender !== "" || location !== '') {

        const request = await axios.post(`${baseUrl}/superAdminAddNewAdmin`, { firstName, lastName, age, phoneNumber, email, password, bloodType, gender, location, hospitalId })
        if (request.status === 200) {
          setApprovedMessage('New admin created successfully')
        } else if (request.status === 201) {
          setNotFound("No Match found")
        }


      }


    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => { AllAdminsInfo() }, [])


  async function RemoveAdmins(item: AllAdmins) {

    setApprovedMessage('')
    setNotFound('')

    try {

      const request = await axios.post(`${baseUrl}/superAdminDeleteAdmin`, { phoneNumber: item.phone_number })

      if (request.status === 200) {
        setApprovedMessage(request.data.message)
        AllAdminsInfo()
      }

    } catch (error) {
      console.log(error)
      if (error) {
        setApprovedMessage('Unknown error')
      }
    }

  }


  return (
    <div className={style.AllAdminsMainBox} >
      <SuperAdminDrawerNavigation />
      <div className={style.AllAdminsInfoBox} >
        <div className={style.section1} >
          <h3>Edit Admins</h3>
          <h2>{approvedMessage}</h2>
          <div>

          </div>
        </div >
        <div className={style.section2} >
          <div className={style.title} >
            <span>Admin Id</span>
            <span>Admin F Name</span>
            <span>Admin L Name</span>
            <span>Admin Age</span>
            <span>Admin Phone</span>
            <span>Admin Email</span>
            <span>Admin location</span>
            <span>Admin Blood</span>
            <span>Admin Gender</span>
            <span>Working Hospital</span>

            <span></span>

          </div >
          <div className={style.addInputs} >
            <span></span>
            <input placeholder='First Name' onChange={(e) => { setFirstName(e.target.value) }} />
            <input placeholder='Last Name' onChange={(e) => { setLastName(e.target.value) }} />
            <input placeholder='Age' onChange={(e) => { setAge(e.target.value) }} />
            <input placeholder='Phone Number' onChange={(e) => { setPhoneNumber(e.target.value) }} />
            <input placeholder='Email Address' onChange={(e) => { setEmail(e.target.value) }} />
            <select value={location}
              onChange={(e) => { setlocation(e.target.value) }} >
              <option value="">Location</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Addis Ababa">Addis Ababa</option>
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
            <select value={gender}
              onChange={(e) => { setGender(e.target.value) }}>
              <option value="">Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <select value={hospitalId}
              onChange={(e) => { setHospital(Number(e.target.value)) }}>
              <option value="">Hospital</option>
              <option value="1">1.TASH</option>
              <option value="2">2.EBOE</option>
            </select>

            <span>
              <button onClick={() => { AddNewAdmin() }}>Add Admin</button>
            </span>
          </div >
          {
            AllAdmins.length > 0 ?
              (<div className={style.AllAdminsData}>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.admin_id}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.first_name}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.last_name}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.age}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.phone_number}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.email}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.location}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.blood_type}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.gender}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li key={item.admin_id}>{item.hospital_code}</li>
                  })}
                </span>
                <span>
                  {AllAdmins.map((item) => {
                    return <li><button onClick={() => { RemoveAdmins(item) }}>Remove Admins</button></li>
                  })}
                </span>
              </div>) : (<div className={style.errorMessage} > {notFound}</div >)
          }

        </div >
      </div >
    </div >
  )
}
