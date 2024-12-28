const nodemailer = require('nodemailer');

const sendEmail = async (email, emailTemplate) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            // user: process.env.EMAIL_USER,
            user: "telehealthonlineconsultation@gmail.com",
            pass: "rjwmatiqakwfnnfu"
            // pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "telehealthonlineconsultation@gmail.com",
        to: email,
        subject: 'Please verify your email',
        html: emailTemplate
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
};
