const {Sequelize, Model} = require('sequelize')
const {unset, clone, isArray} = require('lodash')

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
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, //驼峰转下划线
    scopes: {
      yugc: {
        attributes: {
          exclude: ['created_at', 'updated_at', 'deleted_at']
        }
      }
    }
  }
})
sequelize.sync({
  force: false
})

Model.prototype.toJSON = function() {
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')
  if (isArray(this.exclude)) {
    this.exclude.forEach(val => {
      unset(data, val)
    })
  }
  return data
}
module.exports = {sequelize}
