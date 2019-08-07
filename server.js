const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');
const bodyParser = require('body-parser');
var knex = require('knex');
const register = require('./controllers/register');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'smartbrain'
    }
  });

// console.log(db.select('*').from('users'));


const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/', (request, response)=>{
//     response.json(database.users);   
// })

// SIGN IN
app.post('/signin', (request, response)=>{
    // if(request.body.email === database.users[0].email &&
    //     request.body.password === database.users[0].password){
    //         response.json(database.users[0]);
    //     }
    // else{
    //     response.status(400).json("error signing in");
    // }

    db.select('email', 'hash').from('login')
    .where('email', '=', request.body.email)
    .then(data => {

        const isValid = bcrypt.compareSync(request.body.password, data[0].hash);
        
        if (isValid){
            return db.select('*').from('users')
            .where('email', '=', request.body.email)
            .then(user => {
                response.json(user[0]);
            })
            .catch(err => response.status(400).json("unable to get user"));
        }
        else{
            response.status(400).json("Wrong credentials");
        }
    })
    .catch(err => response.status(400).json("wrong credentials"))
    

})

// REGISTER
app.post('/register', (request, response) => {register.handleRegister(request, response, db, bcrypt)})


// /profile/:id
app.get('/profile/:id', (request, response) => {

    const { id } = request.params;

    // database.users.forEach( user => {
    //     if(user.id === id){
    //         return response.json(user);
    //     }
    // })

    db('users').select('*')
    .where({ id })
    .then(user => {
        user.length ? response.json(user[0])
        : response.status(400).json("no such user")
    })
    
})

// /Image

app.put('/image', (request, response) => {
    const {id} = request.body;
    
    // database.users.forEach( user => {
    //     if(user.id === id){
    //         user.entries++;
    //         return response.json(user.entries);
    //     }
    // })
    
    db('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        response.json(entries[0])
    })
    .catch(err => response.status(400).json("unable to fetch entries"));


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