const clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '79950ea53abc48a1a39f5c6038324b8e'});


const handleApiCall = (request, response) => {
    const {input} = request.body;
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
        response.json(data);
    })
    .catch(err => response.status(400).json("can not make api call"));
}



const handleImage = (request, response, db) => {
    const {id} = request.body;
    
    db('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        response.json(entries[0])
    })
    .catch(err => response.status(400).json("unable to fetch entries"));
}

module.exports = {
    handleImage : handleImage,
    handleApiCall : handleApiCall
}