const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

const FlowModel = {
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}
class Flow extends Model {}

Flow.init(FlowModel, {sequelize, tableName: 'flow'})

module.exports = {Flow}
