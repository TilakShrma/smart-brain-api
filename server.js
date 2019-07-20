const express = require('express');

const app = express();

app.get('/', (request, response)=>{
    response.send('This is working');
})

app.listen(3001, ()=>{
    console.log('Listening to localhost:3001....');
})