'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // board 모델과 User 모델을 연결합니다.
      // 하나의 게시글은 한 명의 사용자에게 속합니다.
      // userId는 외래 키(Foreign Key) 역할을 합니다.
      board.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  board.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER, // 게시글 작성자의 ID
    },
    {
      sequelize,
      modelName: 'booard',
    },
  )
  return board
}
