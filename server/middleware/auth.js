const bcrypt = require('bcryptjs')

const generatePasswordHash = async (password, saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


module.exports = {
    generatePasswordHash,
}