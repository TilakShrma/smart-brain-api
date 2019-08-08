const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');
const bodyParser = require('body-parser');
var knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/signin', (request, response) => {signin.handleSignIn(request, response, db, bcrypt)});

app.post('/register', (request, response) => {register.handleRegister(request, response, db, bcrypt)});

app.get('/profile/:id', (request, response) => {profile.handleGetProfile(request, response, db)});

app.put('/image', (request, response) => {image.handleImage(request, response, db)});

app.post('/imageApiCall', (request, response) => { image.handleApiCall(request, response)});

app.listen(3000, ()=>{
    console.log('Listening to localhost:3000....');
})

