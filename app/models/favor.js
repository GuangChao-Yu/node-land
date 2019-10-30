const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Art} = require('./art')

class Favor extends Model {
  static async like(art_id, type, uid) {
    // 1.favor表添加记录
    // 2.classic fav_nums
    // 数据库事务-保证数据一致性
    const favor = await Favor.findOne({where: {art_id, type, uid}})
    if (favor) {
      throw new global.errs.LikeError()
    }
    return sequelize.transaction(async t => {
      await Favor.create({art_id, type, uid}, {transaction: t})
      const art = await Art.getData(art_id, type)
      //  increment +值的方法 by:1代表+1
      await art.increment('fav_nums', {by: 1, transaction: t})
    })
  }
  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({where: {art_id, type, uid}})
    if (!favor) {
      throw new global.errs.DislikeError()
    }
    return sequelize.transaction(async t => {
      await favor.destroy({force: true, transaction: t})
      const art = await Art.getData(art_id, type)
      //  decrement -值的方法 by:1代表-1
      await art.decrement('fav_nums', {by: 1, transaction: t})
    })
  }
}

Favor.init(
  {
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: 'favor'
  }
)

module.exports = {
  Favor
}
