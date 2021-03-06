'use strict';

//const Sequelize = require('sequelize');

//let dbConfig = require('../config/db.config');

//let sequelize = new Sequelize({
//  dialect: dbConfig.dialect,
//  storage: dbConfig.storage
//});

//let sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//  dialect: dbConfig.dialect,
//  dialectOptions: dbConfig.pool
//});

//let db = {};

//db.sequelize = sequelize;
//db.Sequelize = Sequelize;

//db.conta = require('./conta')(sequelize, Sequelize);
//db.tipoDocumento = require('./tipodocumento')(sequelize, Sequelize);
//db.typeDocument = require('./typeDocument')(sequelize, Sequelize);
//db.visitante = require('./visitante')(sequelize, Sequelize);
//db.individuo = require('./individuo')(sequelize, Sequelize);

//db.visitante.belongsTo(db.typeDocument, {allowNull: false});
//db.individuo.belongsTo(db.conta, {foreignKey: 'contaId', targetKey: 'id'});
//db.individuo.belongsTo(db.typeDocument, {allowNull: false});

//module.exports = db;





/*
sequelize
  .authenticate()
  .then((v) => {
    console.log('Connection has been established successfully.');
  })
  .catch((e) => {
    console.error('Unable to connect to the database:', err);
  });
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
