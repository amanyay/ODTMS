
//Packages

const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('./config/db');
const JWT = require('jsonwebtoken');
const OpenAiAPI = require('openai-api-node');
const OpenAI = require('openai');
const axios = require("axios");
const cors = require('cors')
const rateLimit = require('express-rate-limit')



require('dotenv').config();
const app = express();


const endpoint = "https://router.huggingface.co/v1";

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use(limiter)


app.listen(port, () => {
    console.log("server running in port", port);
})

app.get('/', (req, res) => {
    res.send("ODTMS APP is running")
})






//Super Admin Routes

const loginRoutes = require('./routes/login');
const adminAddNewAdminRoutes = require('./routes/superAdminRoutes/adminAddNewAdmin');
const adminAddOrganRoutes = require('./routes/superAdminRoutes/adminAddOrgan');
const superAdminHistory = require('./routes/superAdminRoutes/superAdminHistory');
const superAdminSearch = require('./routes/superAdminRoutes/superAdminSearch');
const adminDonorsData = require('./routes/superAdminRoutes/adminDonorsData');
const adminLogin = require('./routes/adminLogin');
const adminOrgansData = require('./routes/superAdminRoutes/adminOrgansData');
const adminRecipentsData = require('./routes/superAdminRoutes/adminRecipentsData');
const adminRequestData = require('./routes/superAdminRoutes/superAdminSearch');
const superAdminReport = require('./routes/superAdminRoutes/superAdminDashboard')
const superAdminProfile = require('./routes/superAdminRoutes/superAdminProfile');
const adminRequestApp = require('./routes/superAdminRoutes/adminRequestApp')
const superAdminFetchAdmins = require('./routes/superAdminRoutes/superAdminFetchAdmins')
const superAdminDeleteAdmins = require('./routes/superAdminRoutes/superAdminDeleteAdmins')



//Eye bank Admin Routes

const eyeBankAdminProfile = require('./routes/eyeBankAdminRoutes/eyeBankAdminProfile');

const eyeBankDonorAdmin = require('./routes/eyeBankAdminRoutes/eyeBankDonorAdmin');
const eyeBankAdminAddDonor = require('./routes/eyeBankAdminRoutes/eyeBankAdminAddDonor')
const eyeBankDeleteDonors = require('./routes/eyeBankAdminRoutes/eyeBankDeleteDonors')

const eyeBankRecipentAdmin = require('./routes/eyeBankAdminRoutes/eyeBankRecipentAdmin');
const eyeBankDeleteRecipents = require('./routes/eyeBankAdminRoutes/eyeBankDeleteRecipents')

const eyeBankOrganEdit = require('./routes/eyeBankAdminRoutes/eyeBankOrganEdit');

const eyeBankRequest = require('./routes/eyeBankAdminRoutes/eyeBankRequest');
const eyeBankRequestApprove = require('./routes/eyeBankAdminRoutes/eyeBankRequestApprove')

const eyeTransplantComplete = require('./routes/eyeBankAdminRoutes/eyeTransplantComplete');
const eyeTransplantCompleteApprove = require('./routes/eyeBankAdminRoutes/eyeTransplantCompleteApprove');
const eyeBankTransplantReject = require('./routes/eyeBankAdminRoutes/eyeBankTransplantReject')

const eyeBankAddToWaitingList = require('./routes/eyeBankAdminRoutes/eyeBankAddToWaitingList');
const eyeBankMatchedOrgan = require('./routes/eyeBankAdminRoutes/eyeBankMatchedOrgan');

const eyeBankHistory = require('./routes/eyeBankAdminRoutes/eyeBankHistory')
const eyeBankReportDashboard = require('./routes/eyeBankAdminRoutes/eyeBankReportDashboard')

const eyeBankSearch = require('./routes/eyeBankAdminRoutes/eyeBankSearch')

//Kidney Admin Routes

const kidneyAdminProfile = require('./routes/kidneyAdminRoutes/kidenyAdminProfile');

const kidneyDonorAdmin = require('./routes/kidneyAdminRoutes/kidneyDonor');
const kidneyRecipentAdmin = require('./routes/kidneyAdminRoutes/kidneyRecipents');

const kidneyOrganEdit = require('./routes/kidneyAdminRoutes/kidneyEdit');

const kidneyRequest = require('./routes/kidneyAdminRoutes/kidneyRequest');
const kidneyRequestApprove = require('./routes/kidneyAdminRoutes/kidneyRequestApprove');

const kidneyTransplantComplete = require('./routes/kidneyAdminRoutes/kidneyTransplantComplete');
const kidneyTransplantCompleteApprove = require('./routes/kidneyAdminRoutes/kidneyTransplantCompleteApprove');

const kidneyAddToWaitingList = require('./routes/kidneyAdminRoutes/kidneyAddToWaitingList')
const kidneyMatchedOrgan = require('./routes/kidneyAdminRoutes/kidneyMatchedOrgan')

const kidneyHistory = require('./routes/kidneyAdminRoutes/kidneyHistory')
const kidneyReportDashboard = require('./routes/kidneyAdminRoutes/kidneyReportDashboard')

const kidneySearch = require('./routes/kidneyAdminRoutes/kidneySearch')



//Other Routes


const chatBot = require('./routes/chatBot')
const deleteAccount = require('./routes/deleteAccount')
const deleteDonors = require('./routes/eyeBankAdminRoutes/deleteDonors')
const donOrgans = require('./routes/donOrgans')
const donorsForm = require('./routes/donorsForm')
const history = require('./routes/history')
const home = require('./routes/home')
const profile = require('./routes/profile')
const recForm = require('./routes/recForm')
const recOrgans = require('./routes/recOrgans')
const recRequests = require('./routes/recRequests')
const signUp = require('./routes/signup')
const statstics = require('./routes/statstics')
const updateProfile = require('./routes/updateProfile')
const userNotification = require('./routes/userNotification')
const qr = require('./routes/qr')
const forgetPassword = require('./routes/forgetPassword')
const verification = require('./routes/verification');
const otpGeneration = require('./routes/otpGeneration')
const changeNewPassword = require('./routes/changeNewPassword')
const faydaVerification = require('./routes/faydaVerification');



//        Login Routes and SignUp

app.use('/login', loginRoutes)
app.use('/adminLogin', adminLogin)
app.use('/signUp', signUp)



//        Normal Routes

app.use('/home', home)
app.use('/profile', profile)
app.use('/donorsForm', donorsForm)
app.use('/recForm', recForm)
app.use('/recOrgans', recOrgans)
app.use('/donOrgans', donOrgans)
app.use('/recRequests', recRequests)
app.use('/userNotification', userNotification)
app.use('/updateProfile', updateProfile)
app.use('/deleteAccount', deleteAccount)
app.use('/history', history)
app.use('/statstics', statstics)
app.use('/chatBot', chatBot)
app.use('/forgetPassword', forgetPassword)
app.use('/verification', verification)
app.use('/otpGeneration', otpGeneration)
app.use('/changeNewPassword', changeNewPassword)
app.use('/faydaVerification', faydaVerification)
app.use('/qr', qr)


//          SUPER-ADMIN API

app.use('/superAdminProfile', superAdminProfile)

app.use('/adminOrgansData', adminOrgansData)

app.use('/adminDonorsData', adminDonorsData)

app.use('/adminRecipentsData', adminRecipentsData)

app.use('/adminRequestData', adminRequestData)
app.use('/adminRequestApp', adminRequestApp)

app.use('/superAdminSearchAll', superAdminSearch)
app.use('/superAdminHistory', superAdminHistory)

app.use('/superAdminAddNewAdmin', adminAddNewAdminRoutes)
app.use('/superAdminFetchAdmins', superAdminFetchAdmins)

app.use('/superAdminReport', superAdminReport)

app.use('/adminAddOrgan', adminAddOrganRoutes)
app.use('/superAdminDeleteAdmin', superAdminDeleteAdmins)


//           EYE BANK ADMIN API 


app.use('/eyeBankAdminProfile', eyeBankAdminProfile)


app.use('/eyeBankDonorAdmin', eyeBankDonorAdmin)
app.use('/eyeBankAdminAddDonor', eyeBankAdminAddDonor)
app.use('/eyeBankDeleteDonors', eyeBankDeleteDonors)

app.use('/eyeBankRecipentAdmin', eyeBankRecipentAdmin)
app.use('/eyeBankDeleteRecipents', eyeBankDeleteRecipents)

app.use('/eyeBankTransplantComplete', eyeTransplantComplete)
app.use('/eyeBankTransplantCompleteApprove', eyeTransplantCompleteApprove)

app.use('/eyeBankOrganAdmin', eyeBankOrganEdit)

app.use('/eyeBankRequest', eyeBankRequest);
app.use('/eyeBankRequestApprove', eyeBankRequestApprove)
app.use('/eyeBankTransplantReject', eyeBankTransplantReject)

app.use('/eyeBankAddToWaitingList', eyeBankAddToWaitingList)
app.use('/eyeBankMatchedOrgan', eyeBankMatchedOrgan)

app.use('/eyeBankHistory', eyeBankHistory)
app.use('/eyeBankReport', eyeBankReportDashboard)

app.use('/search', eyeBankSearch)
app.use('/eyeBankProfile', eyeBankAdminProfile)


//            KIDNEY ADMIN API

app.use('/kidneyAdminProfile', kidneyAdminProfile)
app.use('/KidneyDonorAdmin', kidneyDonorAdmin)
app.use('/KidneyRecipentAdmin', kidneyRecipentAdmin)


app.use('/KidneyTransplantComplete', kidneyTransplantComplete)
app.use('/kidneyTransplantCompleteApprove', kidneyTransplantCompleteApprove)

app.use('/KidneyOrganAdmin', kidneyOrganEdit)

app.use('/KidneyRequest', kidneyRequest);
app.use('/kidneyRequestApprove', kidneyRequestApprove)

app.use('/kidneyMatchedOrgan', kidneyMatchedOrgan);
app.use('/kidneyAddToWaitingList', kidneyAddToWaitingList)

app.use('/KidneyHistory', kidneyHistory)
app.use('/kidneyReport', kidneyReportDashboard)

app.use('/kidneysearch', kidneySearch)
app.use('/kidneyProfile', kidneyAdminProfile)
