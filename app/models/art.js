const {Movie, Sentence, Music} = require('./classic')

class Art {
  static async getData(art_id, type) {
    let artData = null
    const finder = {where: {id: art_id}}
    switch (type) {
      case 100:
        artData = await Movie.findOne(finder)
        break
      case 200:
        artData = await Music.findOne(finder)
        break
      case 300:
        artData = await Sentence.findOne(finder)
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
