const {Op} = require('sequelize')
const {flatten} = require('lodash') // 展平数组
const {Movie, Sentence, Music} = require('./classic')

class Art {
  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (ids.length === 0) {
        continue
      }
      key = parseInt(key)
      arts.push(await Art._getListByType(artInfoObj[key], key))
    }
    return flatten(arts)
  }

  static async _getListByType(ids, type) {
    let arts = []
    const finder = {where: {id: {[Op.in]: ids}}}
    const scope = 'yugc'
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findAll(finder)
        break
      case 200:
        arts = await Music.scope(scope).findAll(finder)
        break
      case 300:
        arts = await Sentence.scope(scope).findAll(finder)
        break
      case 400:
        break
      default:
        break
    }
    return arts
  }

  static async getData(art_id, type, useScope = true) {
    let artData = null
    const finder = {where: {id: art_id}}
    const scope = useScope ? 'yugc' : null
    switch (type) {
      case 100:
        artData = await Movie.scope(scope).findOne(finder)
        break
      case 200:
        artData = await Music.scope(scope).findOne(finder)
        break
      case 300:
        artData = await Sentence.scope(scope).findOne(finder)
        break
      case 400:
        break
      default:
        break
    }
    return artData
  }
}

module.exports = {Art}
