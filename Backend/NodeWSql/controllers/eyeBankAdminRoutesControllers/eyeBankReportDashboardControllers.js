const adminModel = require('../../models/adminModel')

async function eyeBankReportDashboardController(req, res) {

    try {
        const adminDashboardData = await adminModel.adminDashboardData()
        const groupBySelctionQuery = await adminModel.groupBySelctionQuery()



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

}

module.exports = { eyeBankReportDashboardController }