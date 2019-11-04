const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Comment extends Model {
  /**
   * 添加评论
   * @param {int} bookId bookd id
   * @param {string{12}} content 评论内容
   */
  static async addComment(bookId, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookId,
        content
      }
    })
    if (!comment) {
      return await Comment.create({
        book_id: bookId,
        content,
        nums: 1
      })
    } else {
      return await comment.increment('nums', {
        by: 1
      })
    }
  }

  /**
   * 查询具体书籍的短评
   * @param {int} bookId
   */
  static async getComments(bookId) {
    const comments = await Comment.findAll({
      where: {
        book_id: bookId
      }
    })
    return comments
  }
}

Comment.init(
  {
    content: Sequelize.STRING(12),
    nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    book_id: Sequelize.INTEGER
  },
  {sequelize, tableName: 'comment'}
)

module.exports = {Comment}
