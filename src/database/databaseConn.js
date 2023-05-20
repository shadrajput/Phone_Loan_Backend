const db = require('../../models')

async function startDatabase(){
  db.sequelize.sync().then(() => {
    console.log('Connected to database');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
}

module.exports = {startDatabase};
  
