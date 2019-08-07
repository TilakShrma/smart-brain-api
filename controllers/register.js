const handleRegister = (request, response, db, bcrypt) => {
    const saltrounds = 10;
    const { name, email ,password} = request.body;
    const hash = bcrypt.hashSync(password, saltrounds);

    db.transaction(trx => {{
        trx.insert({
            email : email,
            hash : hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email : loginEmail[0],
                name : name,
                joined : new Date()
            })
            .then(user => {
                response.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }})
    .catch(err => response.status(400).json("unable to join"));
    
}

module.exports = {
    handleRegister : handleRegister
}