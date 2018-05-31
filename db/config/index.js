const sequelize = require('sequelize');
const connection = new sequelize('product_images','root','', {
  host: 'localhost',
  dialect: 'postgres'
});

connection.authenticate()
.then(() => console.log('successfully connected to db'))
.catch(err => console.log('error connecting to db', err));

module.exports = {
  connection: connection
}