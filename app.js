const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '19496923092-5mqckmkrmnph8sjjmp6n5qsq24gbifr8.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//043n9TFT2jSPjCgYIARAAGAQSNwF-L9IrgPkRT6pKishER5_gWSNMA3rBhO-bNxnOjg5ZCPdzBkBJ3NA2_CtEiqbpzDBaULlS6X4';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'chandankumarbehera1425@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        let email="justchandankumar.co@gmail.com"
        const mailOptions = {
            from: 'This is ChandanApi🌐',
            to: email,
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html:`Hello ${email}, This email is auto generated from using google gmail api`,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));