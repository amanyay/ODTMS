/* eslint-disable react-hooks/set-state-in-effect */
import style from '../styles/kidneyCSS/kidneyAdminProfile.module.css'
import KidneyDrawerNavigation from '../Components/KidneyDrawerNavigation'
import baseUrl from "../../network/api"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'




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
  const [updateForm, setUpdateForm] = useState(false)
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [location, setlocation] = useState('')



  async function displayProfile() {

    const token = localStorage.getItem('token');

    const request = await axios.post(`${baseUrl}/kidneyProfile`, { token })

    if (request.status === 200) {
      setMyData(request.data.message)
    }
  }

  useEffect(() => { displayProfile() }, [])


  async function superAdminUpdateProfile() {

    setError('')

    const token = localStorage.getItem('token');

    if (firstName === '' || lastName === '' || age === '' || phoneNumber === '' || email === '' || password === '' || gender === '' || bloodType === '' || location === '') {
      setError('Please Fill all field')
    }
    else if (firstName !== '' || lastName !== '' || age !== '' || phoneNumber !== '' || email !== '' || password !== '' || gender !== '' || bloodType !== '' || location !== '') {


      const request = await axios.post(`${baseUrl}/superAdminUpdateProfile`, { token, firstName, lastName, age, phoneNumber, email, password, gender, bloodType, location })

      if (request.status === 200) {
        setUpdateForm(false)
      }
    }



  }



  return (
    <div className={style.profilePageMainBox}>
      <KidneyDrawerNavigation />

      <div className={style.profilePageMainBox1}>
        <div className={updateForm ? (style.updateForm) : (style.updateFormDisable)}>

          <h1><button onClick={() => { setUpdateForm(false) }}><CgClose /></button></h1>
          <div className={style.updateInformationsBox}>
            <div className={style.updateUserInformations}>
              <div className={style.updateDataTitleBox}>
                <h2>Personal Info</h2>
              </div>
              <div className={style.updateDataTitleBox}>
                <p>First name</p>
                <p>Last name</p>
                <p>Age</p>
              </div>
              <div className={style.updateDataTitleBox}>
                <input placeholder='Enter your first name' onChange={(e) => { setFirstName(e.target.value) }} />
                <input placeholder='Enter your last name' onChange={(e) => { setLastName(e.target.value) }} />
                <input placeholder='Enter your age' onChange={(e) => { setAge(e.target.value) }} />
              </div>

              <div className={style.updateDataTitleBox}>
                <p>Phone Number</p>
                <p>Email</p>
                <p>Password</p>
              </div>
              <div className={style.updateDataTitleBox}>
                <input placeholder='Enter your phone number' onChange={(e) => { setPhoneNumber(e.target.value) }} />
                <input placeholder='Enter your email address' onChange={(e) => { setEmail(e.target.value) }} />
                <input placeholder='Enter your password' type='password' onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <div className={style.updateDataTitleBox}>
                <p>Gender</p>
                <p>Blood Type</p>
                <p>Location</p>
              </div>
              <div className={style.updateDataTitleBox}>
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
                <select value={location}
                  onChange={(e) => { setlocation(e.target.value) }}>
                  <option value="">Location</option>
                  <option value="Addis Ababa">Addis Ababa</option>
                  <option value="Tigray">Tigray</option>
                  <option value="Oromia">Oromia</option>
                  <option value="Amhara">Amhara</option>
                </select>
              </div>
            </div>
            <h4>{error}</h4>
            <h3><button onClick={() => { superAdminUpdateProfile() }}>Save</button></h3>
          </div>
        </div>
        <div className={style.header}>
          <h3>General Information</h3>
        </div>
        <div className={style.informationsBox}>
          <div className={style.editBtnsBox}>
            <button onClick={() => { setUpdateForm(true) }}>Update</button>
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
