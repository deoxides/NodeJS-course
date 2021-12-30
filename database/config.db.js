const mongoose = require('mongoose');
const dbConnection = async()=> {
    try {
        console.log('Establishing DB connection'.yellow)
        await mongoose.connect(process.env.MONGO_CONN)
        console.log('DB connected'.green)
    } catch (error) {
        console.log(`${error}`.red)
        throw new Error('Error al ejecutar la BD')
    }
}
module.exports = {dbConnection};