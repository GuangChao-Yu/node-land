const {Sequelize, Model, Op} = require('sequelize')
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
      const art = await Art.getData(art_id, type, false)
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
      const art = await Art.getData(art_id, type, false)
      //  decrement -值的方法 by:1代表-1
      await art.decrement('fav_nums', {by: 1, transaction: t})
    })
  }
  static async userLikeIt(art_id, type, uid) {
    const favor = Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    return favor ? true : false
  }
  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400
        }
      }
    })
    if (!arts) {
      throw new global.errs.NotFound()
    }
    return await Art.getList(arts)
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
