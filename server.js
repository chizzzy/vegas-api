const nodemailer = require('nodemailer');
const http = require('http');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express();
const userData = require('./userdata');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: userData.user,
         pass: userData.password
     }
 });
 const mailOptions = {
  from: 'vegas.lazurnoe@gmail.com', // sender address
  to: 'mgandrey99@gmail.com', // list of receivers
  subject: 'Сообщение от пансионата Vegas', // Subject line
  html: ``
};

app.listen(4000, function () {
  console.log('Email sender is listening on port 4000');
  console.log(userData);
});

let data = ''
function send() {
  console.log(userData);
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) 
          console.log(err);
        else
          console.log(info);
     });
}


app.get('/', function (request, response) {
  response.send('GET request to the homepage');
});

// POST method route
app.post('/', function (request, response) {
  data = request.body;
  mailOptions.html = `<p>Имя: ${data.name}</p><br>
  <p>Электронная почта: ${data.email}</p><br>
  <p>Номер телефона: ${data.phone}</p><br>
  <p>Дата заезда: ${data.arrival}</p><br>
  <p>Дата отъезда: ${data.departure}</p><br>
  <p>Кол-во взрослых: ${data.adults}</p><br>
  <p>Кол-во детей: ${data.children}</p><br>
  <p>Удобства: ${data.facilities === true ? 'да' : 'нет'}</p><br>
  <p>Вопросы, пожелания: ${data.message !== '' ? data.message : '-'}</p><br>`
  console.log(data);
  send();
  response.send('POST request to the homepage');
});
  