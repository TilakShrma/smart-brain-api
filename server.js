const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./dummy_database');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response)=>{
    response.json(database.users);   
})

// SIGN IN
app.post('/signin', (request, response)=>{
    if(request.body.email === database.users[0].email &&
        request.body.password === database.users[0].password){
            response.json(database.users[0]);
        }
    else{
        response.status(400).json("error signing in");
    }
})

// REGISTER
app.post('/register', (request, response)=>{
    const { name, email ,password} = request.body;
    bcrypt.hash(password, 1, function(err, hash) {
        console.log(hash);
    });

    database.users.push({

        id : database.users.length,
        name : name,
        email : email,
        password : password,
        entries : 0,
        joined : new Date()
        
    })

    // return new added user
    response.json(database.users[database.users.length -1]);
})


// /profile/:id
app.get('/profile/:id', (request, response) => {

    const { id } = request.params;

    database.users.forEach( user => {
        if(user.id === id){
            return response.json(user);
        }
    })

    response.status(404).json("No such user found!");

})

// /Image

app.put('/image', (request, response) => {
    const {id} = request.body;
    database.users.forEach( user => {
        if(user.id === id){
            user.entries++;
            return response.json(user.entries);
        }
    })
    

})


app.listen(3000, ()=>{
    console.log('Listening to localhost:3000....');
})


/**
 *      / => this is working
 *      /signin => POST = success/fail
 *      /register => POST = user
 *      /profile:id => GET = user
 *      /image  => PUT = user  this endpoint if for updating rank based on inputs
 */