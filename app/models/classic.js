const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

const classFields = {
  image: {
    type: Sequelize.STRING,
    get() {
      return global.config.host + this.getDataValue('image')
    }
  },
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model {}

Movie.init(classFields, {sequelize, tableName: 'movie'})

class Sentence extends Model {}

Sentence.init(classFields, {sequelize, tableName: 'sentence'})

class Music extends Model {}

Music.init(
  Object.assign(
    {
      url: Sequelize.STRING
    },
    classFields
  ),
  {sequelize, tableName: 'music'}
)

module.exports = {
  Movie,
  Sentence,
  Music
}
