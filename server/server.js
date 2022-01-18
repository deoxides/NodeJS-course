const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");

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
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.route"));
    this.app.use(this.paths.categories,require('../routes/categories.route'));
    this.app.use(this.paths.products,require('../routes/products.route'));
    this.app.use(this.paths.search,require('../routes/search.route'));
    this.app.use(this.paths.users, require("../routes/users.route"));
  }
  listener() {
    this.app.listen(this.port, () => {
      console.log(`Aplicacion ejecutandose en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
