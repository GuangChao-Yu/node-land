const {Sequelize, Model} = require('sequelize')
const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')

class User extends Model {
  static async verifyEmailPassWord(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      throw new global.errs.NotFound('账号不存在')
    }
    const corrent = bcrypt.compareSync(plainPassword, user.password) // 对比数据库
    if (!corrent) {
      throw new global.errs.AuthFailed('不正确')
    }
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid) {
    const user = await User.create({
      openid
    })
    return user
  }
}

User.init(
  {
    // 主键 关系型数据库 唯一，不能为空
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true //自动增长id
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {sequelize, tableName: 'user'}
)

module.exports = {User}
