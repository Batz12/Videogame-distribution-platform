const Sequelize = require('sequelize');
const connection = new Sequelize(
    'Videogames', // name of db
    'root', //Username
    'GodofWar@2021', //Password
  {
    // Defining our connect by Sequelize constructor
    host: 'localhost',
    dialect: 'mysql', // According to which dbms you are using
  }
);

const User = connection.define('Users', {
  U_id: {
    type: Sequelize.INTEGER, // All dataTypes format available here http://bit.ly/2ofwgAm
    primaryKey: true,
    autoIncrement: true,
  },
  S_id: Sequelize.INTEGER,
  Type: Sequelize.TEXT,
  Email: Sequelize.TEXT,
  Username: Sequelize.TEXT,
  Password: Sequelize.TEXT,
});

// Syncing all our model to our DB
connection.sync().then(() => {
  console.log('Connected to DB');
});

module.exports = User; // Exporting our user model