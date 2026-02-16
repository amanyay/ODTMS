const express = require('express');
const bodyParser = require('body-parser');
const mogoose = require('mongoose');
const jwt = require('jsonwebtoken');

const mogooseUrl = "mongodb+srv://amulayismaw:123456Aman@cluster0.sjsjzwk.mongodb.net/?appName=Cluster0"
const app = express();
const JWT_SECRET = "ajd82hAHSJH82hjsahj@#92hjsa8h2hjsa";



app.use(express.json());

mogoose.connect(mogooseUrl).then(() => {
    console.log('Database connected');
})

require('./userDetail');

const usersData = mogoose.model('UserInfo');
const organsData = mogoose.model('organs');



app.listen(3000, () => {
    console.log("running on port 3000");
});

app.post("/login", async (req, res) => {

    const phoneNumberFromFrontend = req.body.phoneNumber;
    const passwordFromFrontEnd = req.body.password;
    const checkData = await usersData.findOne({
        phoneNumber: phoneNumberFromFrontend,
        password: passwordFromFrontEnd
    })

    if (!checkData) {
        res.send({ message: "User not found" });
    } else {
        const token = jwt.sign({ tokenPhoneNumber: checkData.phoneNumber }, JWT_SECRET);
        console.log(token);
        res.send({ token: token, message: "", status: "ok" });
    }

})


app.post("/signUp", async (req, res) => {

    const first_name = req.body.firstName;
    const phone_number = req.body.phoneNumber;
    const email_address = req.body.email;
    const password = req.body.password;
    const oldUser = await usersData.findOne({
        phoneNumber: phone_number
    })

    if (oldUser) {
        res.send({ data: "User already existed" });
    } else {
        try {
            await usersData.create({
                firstName: first_name,
                phoneNumber: phone_number,
                emailAddress: email_address,
                password: password
            })
            res.send({ data: "User created successfully " });
        } catch (error) {
            res.send({ data: "Error in creating user" });
        }

    }
})

app.post("/home", async (req, res) => {
    const tokens = req.body.token;
    const tokenFromFrontEnd = jwt.verify(tokens, JWT_SECRET);
    const decodedPhoneNumber = tokenFromFrontEnd.tokenPhoneNumber;
    const userFindByPhoneNumber = await usersData.findOne({
        phoneNumber: decodedPhoneNumber
    })

    if (!userFindByPhoneNumber) {
        res.send({ message: "User not found" })
    } else {
        res.send({
            status: 'ok',
            data: {
                firstName: userFindByPhoneNumber.firstName,
                phoneNumber: userFindByPhoneNumber.phoneNumber,
                emailAddress: userFindByPhoneNumber.emailAddress
            }
        })
    }

})





app.post("/donorsForm", async (req, res) => {

    // const first_name = req.body.firstName;  (this line and the next line code are the same way to get the 
    // front end data the difference is assign all data to one variable 
    // and to acces it use ().) and the front end 
    // variable name)

    const { firstName, email, age, location, bloodType, gender, tokenToBackEnd } = req.body;

    const verifyToken = jwt.verify(tokenToBackEnd, JWT_SECRET);
    const decodedPhoneNumber = verifyToken.tokenPhoneNumber;


    const checkTokenFromDatabase = await usersData.findOne({
        phoneNumber: decodedPhoneNumber
    })

    console.log(checkTokenFromDatabase.phoneNumber);

    if (checkTokenFromDatabase) {
        const updateData = await usersData.updateOne({ phoneNumber: decodedPhoneNumber },
            {
                $set: {
                    firstName: firstName,
                    emailAddress: email,
                    age: age,
                    location: location,
                    bloodType: bloodType
                }
            })
        if (!updateData) {
            res.send({ data: "You are not allowed to update" });
        }
        else {
            res.send({ data: "Sucessfully Updated" });
        }


    }
})



app.post('/profile', async (req, res) => {

    const tokenFromProfilePage = req.body.token;
    const verifyToken = jwt.verify(tokenFromProfilePage, JWT_SECRET);
    const decodedPhoneNumber = verifyToken.tokenPhoneNumber;

    const dataByPhoneNumber = await usersData.findOne({
        phoneNumber: decodedPhoneNumber
    })

    if (!dataByPhoneNumber) {
        res.send({ message: 'Not found' })
    }
    else {
        res.send({
            message: {
                name: dataByPhoneNumber.firstName,
                phoneNumber: dataByPhoneNumber.phoneNumber,
                emailAddress: dataByPhoneNumber.emailAddress,
                age: dataByPhoneNumber.age,
                bloodType: dataByPhoneNumber.bloodType,
                location: dataByPhoneNumber.location,
            }
        })
    }



})
