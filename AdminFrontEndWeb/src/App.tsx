import { Routes, Route, BrowserRouter } from 'react-router-dom'


//Routes Import 
import EyeDonor from './EyeBankAdmin/EyeDonor'
import Dashboard from './EyeBankAdmin/DashBoard'
import EyeEdit from './EyeBankAdmin/EyeEdit'
import EyeMatch from './EyeBankAdmin/EyeMatch'
import Eyerecipents from './EyeBankAdmin/EyeRecipents'
import EyeRequest from './EyeBankAdmin/EyeRequest'
import EyeTransplant from './EyeBankAdmin/EyeTransplantComplete'
import EyeHistory from './EyeBankAdmin/EyeHistory'
import AdminProfile from './EyeBankAdmin/EyeBankAdminProfile'
import AdminLogin from './AdminLogin'
import Search from './EyeBankAdmin/EyeDonAndRecSearch'


// kidney
import KidneyDonor from './kidneyAdmin/kidneyDonor'
import KidneyDashboard from './kidneyAdmin/kidneyDashBoard'
import KidneyEdit from './kidneyAdmin/kidneyEdit'
import KidneyMatch from './kidneyAdmin/kidneyMatch'
import Kidneyrecipents from './kidneyAdmin/kidneyRecipents'
import KidneyRequest from './kidneyAdmin/kidneyRequest'
import KidneyTransplant from './kidneyAdmin/kidneyTransplantComplete'
import KidneyHistory from './kidneyAdmin/kidneyHistory'
import KidneyAdminProfile from './kidneyAdmin/kidneyAdminProfile'
import KidneySearch from './kidneyAdmin/kidneyDonAndRecSearch'

//Super Admin

import SuperAdminDashboard from './SuperAdmin/SuperAdminDashBoard'
import SuperAdminAdminEdit from './SuperAdmin/SuperAdminEdit'
import SuperAdminHistory from './SuperAdmin/SuperAdminHistory'
import SuperAdminProfile from './SuperAdmin/SuperAdminProfile'
import SuperAdminSearch from './SuperAdmin/SuperAdminDonAndRecSearch'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/EyeBankDashboard" element={<Dashboard />} />
        <Route path="/Eyerecipents" element={<Eyerecipents />} />
        <Route path="/EyeEdit" element={<EyeEdit />} />
        <Route path="/EyeMatch" element={<EyeMatch />} />
        <Route path="/EyeRequest" element={<EyeRequest />} />
        <Route path="/EyeTransplant" element={<EyeTransplant />} />
        <Route path="/EyeDonor" element={<EyeDonor />} />
        <Route path='/EyeHistory' element={<EyeHistory />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/eyeAdminprofile' element={<AdminProfile />} />


        <Route path="/kidneyDashboard" element={<KidneyDashboard />} />
        <Route path="/kidneyrecipents" element={<Kidneyrecipents />} />
        <Route path="/kidneyEdit" element={<KidneyEdit />} />
        <Route path="/kidneyMatch" element={<KidneyMatch />} />
        <Route path="/kidneyRequest" element={<KidneyRequest />} />
        <Route path="/kidneyTransplant" element={<KidneyTransplant />} />
        <Route path="/kidneyDonor" element={<KidneyDonor />} />
        <Route path='/kidneyHistory' element={<KidneyHistory />} />
        <Route path='/kidneySearch' element={<KidneySearch />} />
        <Route path='/kidneyAdminprofile' element={<KidneyAdminProfile />} />


        <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} />
        <Route path="/SuperAdminEdit" element={<SuperAdminAdminEdit />} />
        <Route path='/SuperAdminHistory' element={<SuperAdminHistory />} />
        <Route path='/SuperAdminSearch' element={<SuperAdminSearch />} />
        <Route path='/SuperAdminprofile' element={<SuperAdminProfile />} />
      </Routes>

    </BrowserRouter>
  );
}