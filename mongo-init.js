// eslint-disable-next-line no-undef
db.createUser({
    user: 'root',
    pwd: 'secret',
    roles: [
        {
            role: 'root',
            db: 'admin'
        },
        {
            role: 'readWrite',
            db: 'register'
        }
    ]
});
