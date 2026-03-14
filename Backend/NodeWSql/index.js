
//Packages

const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('./db');
const JWT = require('jsonwebtoken');
const OpenAiAPI = require('openai-api-node');
const OpenAI = require('openai')
const axios = require("axios")
require('dotenv').config();

//Routes

const loginRoutes = require('./routes/login')
const adminAddNewAdminRoutes = require('./routes/adminAddNewAdmin')
const adminAddOrganRoutes = require('./routes/adminAddOrgan')
const adminCompleteReqRoutes = require('./routes/adminCompleteReq')
const adminCompleteRequestDataRoutes = require('./routes/adminCompleteRequestData')
const adminDonorsData = require('./routes/adminDonorsData')
const adminLogin = require('./routes/adminLogin')
const adminOrgansData = require('./routes/adminOrgansData')
const adminRecipentsData = require('./routes/adminRecipentsData')
const adminRequestData = require('./routes/adminRequestData')
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
const adminRequestApp = require('./routes/adminRequestApp')



const endpoint = "https://router.huggingface.co/v1";


const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());



app.listen(port, () => {
    console.log("server running in port", port);
})

app.use('/login', loginRoutes)
app.use('/adminLogin', adminLogin)
app.use('/signUp', signUp)
app.use('/home', home)
app.use('/profile', profile)
app.use('/donorsForm', donorsForm)
app.use('/recForm', recForm)
app.use('/donOrgans', donOrgans)
app.use('/recRequests', recRequests)
app.use('/userNotification', userNotification)
app.use('/updateProfile', updateProfile)
app.use('/deleteAccount', deleteAccount)
app.use('/history', history)
app.use('/statstics', statstics)
app.use('/chatBot', chatBot)

//          ADMIN API

app.use('/adminOrgansData', adminOrgansData)
app.use('/adminDonorsData', adminDonorsData)
app.use('/adminRecipentsData', adminRecipentsData)
app.use('/adminRequestData', adminRequestData)
app.use('/adminRequestApp', adminRequestApp)
app.use('/adminCompleteRequestData', adminCompleteRequestDataRoutes)
app.use('/adminCompleteReq', adminCompleteReqRoutes)
app.use('/adminAddNewAdmin', adminAddNewAdminRoutes)
app.use('/deleteDonors', deleteDonors)

