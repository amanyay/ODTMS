
//Packages
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('./db');
const JWT = require('jsonwebtoken');
const OpenAiAPI = require('openai-api-node');
const OpenAI = require('openai');
const axios = require("axios");
require('dotenv').config();

//Admin Routes

const loginRoutes = require('./routes/login');
const adminAddNewAdminRoutes = require('./superAdminRoutes/adminAddNewAdmin');
const adminAddOrganRoutes = require('./superAdminRoutes/adminAddOrgan');
const adminCompleteReqRoutes = require('./superAdminRoutes/adminCompleteReq');
const adminCompleteRequestDataRoutes = require('./superAdminRoutes/adminCompleteRequestData');
const adminDonorsData = require('./superAdminRoutes/adminDonorsData');
const adminLogin = require('./superAdminRoutes/adminLogin');
const adminOrgansData = require('./superAdminRoutes/adminOrgansData');
const adminRecipentsData = require('./superAdminRoutes/adminRecipentsData');
const adminRequestData = require('./superAdminRoutes/adminRequestData');

//Eye bank Admin Routes

const eyeBankAdminProfile = require('./eyeBankAdminRoutes/eyeBankAdminProfile');

const eyeBankDonorAdmin = require('./eyeBankAdminRoutes/eyeBankDonorAdmin');
const eyeBankRecipentAdmin = require('./eyeBankAdminRoutes/eyeBankRecipentAdmin');

const eyeBankOrganEdit = require('./eyeBankAdminRoutes/eyeBankOrganEdit');

const eyeBankRequest = require('./eyeBankAdminRoutes/eyeBankRequest');
const eyeBankRequestApprove = require('./eyeBankAdminRoutes/eyeBankRequestApprove')

const eyeTransplantComplete = require('./eyeBankAdminRoutes/eyeTransplantComplete');
const eyeTransplantCompleteApprove = require('./eyeBankAdminRoutes/eyeTransplantCompleteApprove')


//Kidney Admin Routes

const kidneyAdminProfile = require('./kidneyAdminRoutes/kidenyAdminProfile');

const kidneyDonorAdmin = require('./kidneyAdminRoutes/kidneyDonor');
const kidneyRecipentAdmin = require('./kidneyAdminRoutes/kidneyRecipents');

const kidneyOrganEdit = require('./kidneyAdminRoutes/kidneyEdit');

const kidneyRequest = require('./kidneyAdminRoutes/kidneyRequest');
const kidneyRequestApprove = require('./kidneyAdminRoutes/kidneyRequestApprove');

const kidneyTransplantComplete = require('./kidneyAdminRoutes/kidneyTransplantComplete');
const kidneyTransplantCompleteApprove = require('./kidneyAdminRoutes/kidneyTransplantCompleteApprove');


//Other Routes


const chatBot = require('./routes/chatBot')
const deleteAccount = require('./routes/deleteAccount')
const deleteDonors = require('./routes/deleteDonors')
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
const adminRequestApp = require('./superAdminRoutes/adminRequestApp')
const adminAddOrgan = require('./superAdminRoutes/adminAddOrgan');
const qr = require('./routes/qr')
const forgetPassword = require('./routes/forgetPassword')
const verification = require('./routes/verification');
const otpGeneration = require('./routes/otpGeneration')
const changeNewPassword = require('./routes/changeNewPassword')
const faydaVerification = require('./routes/faydaVerification')





const endpoint = "https://router.huggingface.co/v1";


const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.listen(port, () => {
    console.log("server running in port", port);
})
app.get('/', (req, res) => {
    res.send("ODTMS APP is running")
})

app.use('/login', loginRoutes)
app.use('/adminLogin', adminLogin)
app.use('/signUp', signUp)
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



//          SUPER-ADMIN API

app.use('/adminOrgansData', adminOrgansData)

app.use('/adminDonorsData', adminDonorsData)

app.use('/adminRecipentsData', adminRecipentsData)

app.use('/adminRequestData', adminRequestData)
app.use('/adminRequestApp', adminRequestApp)

app.use('/adminCompleteRequestData', adminCompleteRequestDataRoutes)
app.use('/adminCompleteReq', adminCompleteReqRoutes)

app.use('/adminAddNewAdmin', adminAddNewAdminRoutes)

app.use('/deleteDonors', deleteDonors)

app.use('/adminAddOrgan', adminAddOrgan)
app.use('/qr', qr)


//           EYE BANK ADMIN API 


app.use('/eyeBankAdminProfile', eyeBankAdminProfile)
app.use('/eyeBankDonorAdmin', eyeBankDonorAdmin)
app.use('/eyeBankRecipentAdmin', eyeBankRecipentAdmin)


app.use('/eyeBankTransplantComplete', eyeTransplantComplete)
app.use('/eyeBankTransplantCompleteApprove', eyeTransplantCompleteApprove)

app.use('/eyeBankOrganAdmin', eyeBankOrganEdit)

app.use('/eyeBankRequest', eyeBankRequest);
app.use('/eyeBankRequestApprove', eyeBankRequestApprove)


//            KIDNEY ADMIN API

app.use('/kidneyAdminProfile', kidneyAdminProfile)
app.use('/kidneyDonorAdmin', kidneyDonorAdmin)
app.use('/kidneyRecipentAdmin', kidneyRecipentAdmin)


app.use('/kidneyTransplantComplete', kidneyTransplantComplete)
app.use('/kidneyTransplantCompleteApprove', kidneyTransplantCompleteApprove)

app.use('/kidneyOrganAdmin', kidneyOrganEdit)

app.use('/kidneyRequest', kidneyRequest);
app.use('/kidneyRequestApprove', kidneyRequestApprove)