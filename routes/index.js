const auth = require('./auth.route');
const categories = require('./categories.route');
const products = require('./products.route');
const search = require('./search.route');
const uploads = require('./uploads.route')
const users = require('./users.route');

module.exports = {
    auth,
    categories,
    products,
    search,
    uploads,
    users
}