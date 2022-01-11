const express = require('express')
const cors = require('cors')
const { dbConnection} = require('../database/config.db')

class Server{
    constructor(){
    this.app = express();
    this.port = process.env.PORT;
        this.connectDB();
    this.middleware();
    this.routes();
    }
    async connectDB(){
        await dbConnection();
    }
    middleware(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/auth',require('../routes/auth.route'));
        this.app.use('/api/users',require('../routes/users.route'));
    }
    listener(){
        this.app.listen(this.port,()=>{
            console.log(`Aplicacion ejecutandose en el puerto ${this.port}`)
        })
    }
}


module.exports = Server;