const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise');
const createDBConnection = require('../db');
const JWT = require('jsonwebtoken');
const OpenAiAPI = require('openai-api-node');
const OpenAI = require('openai')
const axios = require("axios")
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;
const port = process.env.PORT;
const app = express();


const endpoint = "https://router.huggingface.co/v1";

app.use(bodyParser.json());

router.post('/', async (req, res) => {

    const { token, userQuestion } = req.body;
    const client = new OpenAI({ baseURL: endpoint, apiKey: process.env.API_KEY });

    try {

        const chatCompletion = await client.chat.completions.create({
            model: "HuggingFaceH4/zephyr-7b-beta:featherless-ai",
            messages: [
                {
                    role: "user",
                    content: userQuestion,
                },
            ],
        });
        if (chatCompletion) {
            // console.log(chatCompletion.choices[0].message.content)
            res.status(200).json({
                message: chatCompletion.choices[0].message.content

            })
        }




    } catch (error) {
        console.log(error)
        if (error.message) {
            console.log(error.message)
            res.status(409).json({ err: " Api error " })
        } else {
            console.log(error)
            res.status(500).json({ err: "Server error" })
        }
    }

})

module.exports = router;