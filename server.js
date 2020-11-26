const path = require('path');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const route = require('./routes/sendTome')

const morgan = require('morgan')
const dotenv = require('dotenv');
const port = process.env.PORT || 4444
dotenv.config();

app.use(express.json())
app.use(morgan('dev'))

app.use('/send', route)



if (process.env.NODE_ENV === "production"){
      app.use(express.static(path.join(__dirname, "client", "build")))
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
      });
    }


app.listen(port,() => {
  console.log(`server is live on port ${port}`);
});