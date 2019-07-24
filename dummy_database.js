const database = {
    users : [
        {
            id : '1',
            name : 'til',
            email : 'til@gmail.com',
            password : 'til',
            entries : 0,
            joined : new Date(),
        },
        {
            id : '2',
            name : 'abc',
            email : 'abc',
            entries : 0,
            joined : new Date(),
        },
        {
            id : '3',
            name : 'abc',
            email : 'abc',
            entries : 0,
            joined : new Date(),
        },
        {
            id : '4',
            name : 'til',
            email : 'abc',
            entries : 0,
            joined : new Date(),
        }
    ],
    login : [
        {
            id : '123',
            hash : '',
            email : 'abc'
        }
    ]
}

module.exports = database;