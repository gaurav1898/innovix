const nodemailer = require('nodemailer');

//Step 1

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gaurav.wekodz@gmail.com',
        pass: 'gaurav@7890'
    }
});

async function sendToNewUser(email, subject, message) {
    //Step 2
    let mailOptions = {
        from: "gaurav.wekodz@gmail.com",
        to: email,
        subject: subject,
        text: message
    }

    //Step 3
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error Occours");
            console.log(err);
        } else {
            console.log("Email sent !!!");
        }
    })
}

module.exports.sendTo = sendToNewUser;