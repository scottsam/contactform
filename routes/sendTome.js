const express = require('express');
const nodemailer = require('nodemailer');
const sendRoute = express.Router()
const dotenv = require('dotenv');
dotenv.config();

const transport = {
    service: 'gmail.com',
    port: 25,
  secure: false,
    
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
    
}


const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log('success')
    }
})

sendRoute.post('/', (req, res, next) => {
const{name, email, subject, message}=req.body
     const mailOptions = {
      from: req.body.email, // sender address
      to: process.env.EMAIL, // list of receivers
      subject: req.body.subject, // Subject line
      html: `
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Subject: ${subject}</li>
        <li>Message: ${message}</li>
      </ul>
      `
    };

if(!name || !message || !email || !subject )return  res.status(400).json({
          success: false,
          message: 'All fields are required!'
        });
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      } else {
        res.json({
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly'
        });
      }
    });
    
})



module.exports= sendRoute