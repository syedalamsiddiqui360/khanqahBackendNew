require('dotenv').config();
const nodemailer = require('nodemailer');
const follower = require("../../database/models/followers");
const users = require("../../database/models/users");


exports.addWhatsAppNumber = async (req, res, next) => {
  const { name, email, phoneNumber } = req.body;

  const data = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  }

  let list = [];
  const emailId = process.env.EMAIL;
  const password = process.env.PASSWORD;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailId,
      pass: password
    }
  });

  try {

    await users.findAll({ 
      where: { deletedAt: null },
      attributes: ['email'],
     })
     .then((result)=>{
      result.forEach((item)=>{
         list.push( item.email);
      })
    })

    var mailOptions = {
      from: emailId,
      to: list,
      subject: 'Add WhatsApp Number',
      text: 'Name :' + name + '\n Email :'+email+'\n Please Add this number on whatsApp group \n Number :' + phoneNumber + '.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send({ "message": error.message });
      } else {
        console.log('Email sent: ' + info.response);
        res.send({ "message": "email has been send successfully", status: req.body });
      }
    });

  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};

exports.addMobileNumber = async (req, res, next) => {
  const { name, email, phoneNumber } = req.body;

  const data = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  }

  let list = [];
  const emailId = process.env.EMAIL;
  const password = process.env.PASSWORD;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailId,
      pass: password
    }
  });

  try {

    await users.findAll({ 
      where: { deletedAt: null },
      attributes: ['email'],
     })
     .then((result)=>{
      result.forEach((item)=>{
         list.push( item.email);
      })
    })

    var mailOptions = {
      from: emailId,
      to: list,
      subject: 'Add Mobile Number',
      text: 'Name :' + name + '\n Please Add this number on shared message \n Number :' + phoneNumber + '.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send({ "message": error.message });
      } else {
        console.log('Email sent: ' + info.response);
        res.send({ "message": "email has been send successfully", status: true });
      }
    });

  } catch (e) {
    res.statusCode = 300;
    console.log(e);
    res.send({ "message": e.message });
  }
};


