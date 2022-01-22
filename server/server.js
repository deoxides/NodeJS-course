const cors = require("cors");
const express = require("express");
const fileUpload = require('express-fileupload')
const { dbConnection } = require("../database/config.db");
const {auth,categories,products,search,uploads,users} = require('../routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectDB();
    this.middleware();
    this.paths = {
        auth: "/api/auth",
        categories: "/api/categories",
        products: "/api/products",
        search:"/api/search",
        uploads:"/api/uploads",
        users: "/api/users",
    };
    this.routes();
  }
  async connectDB() {
    await dbConnection();
  }
  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(fileUpload({useTempFiles : true,tempFileDir : '/tmp/',createParentPath:true}));
  }

  routes() {
    this.app.use(this.paths.auth, auth);
    this.app.use(this.paths.categories,categories);
    this.app.use(this.paths.products,products);
    this.app.use(this.paths.search,search);
    this.app.use(this.paths.uploads,uploads);
    this.app.use(this.paths.users, users);
  }
  listener() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion ejecutandose en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
