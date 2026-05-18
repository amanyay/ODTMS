
import style from '../styles/kidneyCSS/kidneyDonAndRecSearch.module.css'

//File

import SuperAdminDrawerNavigation from '../Components/SuperAdminDrawerNavigation'
import { useState } from 'react'
import axios from 'axios'
import baseUrl from '../../network/api'




export default function KidneyDonAndRecSearch() {


    type searchResultType = {
        first_name: string,
        last_name: string,
        phone_number: string,
        blood_type: string,
        gender: string,
        role: string,
        location: string,
        date: string,
        status: string,
        organ_id: number
    }


    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState<searchResultType[]>([])
    const [notFound, setNotFound] = useState('')

    async function search() {

        try {
            const request = await axios.post(`${baseUrl}/kidneysearch`, { searchInput })
            if (request.status === 200) {
                setSearchResult(request.data.message)
            }
            else if (request.status === 201) {
                setNotFound('No Found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className={style.KidneyOrganMainBox}>
            <SuperAdminDrawerNavigation />

            <div className={style.KidneyOrganInfoBox}>
                <div className={style.section1}>
                    <h3>Search</h3>
                    <div>
                        <input type="text" placeholder='Enter phone number to search' onChange={(e) => { setSearchInput(e.target.value) }} />
                        <button onClick={search}>Search</button>
                    </div>
                </div>
                <div className={style.section2}>
                    <div className={style.title}>
                        <span>Phone Number</span>
                        <span>First Name</span>
                        <span>Last Name</span>
                        <span>Blood Type</span>
                        <span>Gender</span>
                        <span>Role</span>
                        <span>Location</span>
                        <span>Organ ID</span>
                        <span>Status</span>
                        <span></span>
                    </div>
                    {
                        searchResult.length > 0 ?
                            (<div className={style.searchResultBox}>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.phone_number}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.first_name}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.last_name}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.blood_type}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.gender}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.role}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.location}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.organ_id}</li>
                                    })}
                                </span>
                                <span>
                                    {searchResult.map((item) => {
                                        return <li key={item.phone_number}>{item.status}</li>
                                    })}
                                </span>
                                <span>

                                </span>

                            </div>) : (<div className={style.errorMessage} >{notFound}</div >)
                    }


                </div>
            </div>
        </div>
    )
}