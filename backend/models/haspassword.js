const bcrypt = require('bcryptjs');

const plainPassword = 'mySecurePass'; // Pick a password to use for login
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
console.log("Hashed Password:", hashedPassword);