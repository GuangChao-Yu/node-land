const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,

  timezone: '+08:00',
  define: {
    // create_time update_time delete_time 不自动插入表
    timestamps: true,
    paranoid: true, // 显示 delete_time
    createdAt: 'created_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    underscored: true //驼峰转下划线
  }
})
sequelize.sync({
  force: false
})
module.exports = {db: sequelize}
