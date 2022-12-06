const nodemailer = require("nodemailer")

getTransporter = () => {
    return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
    });
};


const wellComeEmail = async (args) => {
    let transporter = getTransporter();
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM_NAME + " <" + process.env.MAIL_FROM + ">", // sender address
            to: args.email,
            subject: `${args.firstName} ${args.lastName}, Welcome`,
            text: `<h1>Welcome</h1><a href=${args.verifyEmailLink}>Verify your email</a>Your verification code is ${args.emailVerifyToken}`,
        });
    } catch (error) {
        console.log("error", error);
    }
};

module.exports = {wellComeEmail}



