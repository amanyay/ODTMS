const mogoose = require('mongoose');

const userSchema = mogoose.Schema({
    firstName: String,
    phoneNumber: String,
    emailAddress: String,
    password: String,
    age: String,
    location: String,
    bloodType: String
}, {
    collection: 'UserInfo'
})


const organSchema = mogoose.Schema({
    organId: String,
    organType: String,
    organAddedData: { type: Date, default: Date.now }
}, {
    collection: 'organs'
})

mogoose.model('organs', organSchema);
mogoose.model('UserInfo', userSchema);