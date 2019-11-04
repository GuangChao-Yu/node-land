const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

const util = require('util')
const axios = require('axios')
const {Favor} = require('../models/favor')

class Book extends Model {
  async detail(id) {
    const url = util.format(global.config.yushu.detailUrl, id)
    const detail = await axios.get(url)
    return detail.data
  }
  static async searchFormYuShu(q, count, start, summary = 1) {
    const url = util.format(
      global.config.yushu.keywordUrl,
      q,
      count,
      start,
      summary
    )
    const result = await axios.get(url)
    return result.data
  }
  static async getMyFavorBookCount(uid) {
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    })
    return count
  }
  static async getMyBookFavor(uid, bookdID) {
    const favorNums = await Favor.count({
      where: {
        art_id: bookdID,
        type: 400
      }
    })
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookdID,
        uid,
        type: 400
      }
    })
    return {
      fav_nums: favorNums,
      like_status: myFavor ? 1 : 0
    }
  }
}

Book.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    fav_nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {sequelize, tableName: 'book'}
)

module.exports = {Book}
