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
import AdminProfile from './EyeBankAdmin/AdminProfile'
import AdminLogin from './AdminLogin'


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
      </Routes>

    </BrowserRouter>
  );
}