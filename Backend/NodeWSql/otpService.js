
let otpStore = null;

function generateOtp() {
    otpStore = Math.round(100000 + Math.random() * 900000).toString();
    return otpStore;
}

function getOtp() {
    return otpStore;
}

module.exports = { generateOtp, getOtp };


