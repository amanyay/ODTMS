/* eslint-disable react-hooks/set-state-in-effect */
import style from '../styles/kidneyCSS/kidneyAdminProfile.module.css'
import KidneyDrawerNavigation from '../Components/KidneyDrawerNavigation'
import baseUrl from "../../network/api"
import axios from 'axios'
import { useEffect, useState } from 'react'




export default function AdminProfile() {
  type MyDataArray = {
    first_name: string,
    last_name: string,
    age: string
    phone_number: string,
    email: string,
    location: string
    role: string,
    gender: string
    blood_type: string
  }

  const [myData, setMyData] = useState<MyDataArray[]>([])


  async function displayProfile() {

    const token = localStorage.getItem('token');

    const request = await axios.post(`${baseUrl}/kidneyProfile`, { token })

    if (request.status === 200) {
      setMyData(request.data.message)
    }
  }

  useEffect(() => { displayProfile() }, [])






  return (
    <div className={style.profilePageMainBox}>
      <KidneyDrawerNavigation />

      <div className={style.profilePageMainBox1}>
        <div className={style.header}>
          <h3>General Information</h3>
        </div>
        <div className={style.informationsBox}>
          <div className={style.editBtnsBox}>
            <button>Update</button>
            <button>Delete</button>
            <button>Logout</button>
          </div>
          <div className={style.userInformations}>
            <div className={style.dataTitleBox}>
              <h2>Personal Info</h2>
            </div>
            <div className={style.dataTitleBox}>
              <p>First name</p>
              <p>Last name</p>
              <p>Phone Number</p>
            </div>
            <div className={style.dataTitleBox}>
              <span>{myData.map((item) => { return item.first_name })}</span>
              <span>{myData.map((item) => { return item.last_name })}</span>
              <span>{myData.map((item) => { return item.phone_number })}</span>
            </div>
            <div className={style.dataTitleBox}>
              <p>Email</p>
              <p>Age</p>
              <p>Gender</p>
            </div>
            <div className={style.dataTitleBox}>
              <span>{myData.map((item) => { return item.email })}</span>
              <span>{myData.map((item) => { return item.age })}</span>
              <span>{myData.map((item) => { return item.gender })}</span>
            </div>
            <div className={style.dataTitleBox}>
              <p>Blood Type</p>
              <p>Role</p>
              <p>Location</p>
            </div>
            <div className={style.dataTitleBox}>
              <span>{myData.map((item) => { return item.blood_type })}</span>
              <span>{myData.map((item) => { return item.role })}</span>

              <span>{myData.map((item) => { return item.location })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
