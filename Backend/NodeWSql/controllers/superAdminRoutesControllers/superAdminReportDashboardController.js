const superAdminModel = require('../../models/superAdminModel')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../../config/db');
const JWT = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


app.use(bodyParser.json());

router.post('/', async (req, res) => {

    try {
        const adminDashboardData = await superAdminModel.superAdminDashboardData()
        const groupBySelctionQuery = await superAdminModel.superAdmingroupBySelctionQuery()


        // console.log(adminDashboardData)
        if (adminDashboardData || groupBySelctionQuery) {

            const totalWaitingListUser = adminDashboardData.waitinglist_user;
            const successfullTransplant = adminDashboardData.successfull_transplant;
            const successFullRate = (parseFloat(successfullTransplant) / parseFloat(totalWaitingListUser)) * 100

            res.status(200).json({
                report: adminDashboardData,
                userBloodTypeAmount: groupBySelctionQuery,
                successFullRate: successFullRate.toFixed(1)
            })

        }
        // console.log(reportSelection)
        // console.log(groupBySelctionQuery)
    } catch (error) {
        console.log(error)
    }

})

module.exports = router 