const handleGetProfile = (request, response, db) => {
    const { id } = request.params;

    db('users').select('*')
    .where({ id })
    .then(user => {
        user.length ? response.json(user[0])
        : response.status(400).json("no such user")
    })
    
}

module.exports = {
    handleGetProfile : handleGetProfile
}