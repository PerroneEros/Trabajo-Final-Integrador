import {DataTypes, Model, Optional} from 'sequelize'
import UserAttributes from './Interface/userAttributes'
import sequelize from '../database/db'
type userCreationAttributes = Optional<UserAttributes, 'id_user'>
class User
  extends Model<UserAttributes, userCreationAttributes>
  implements UserAttributes
{
  declare id_user: number
  declare name: string
  declare email: string
  declare password_hash: string
  declare rol: string
  declare image: string
  declare username: string
}
User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'cliente',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: true,
    underscored: true,
  },
)
export default User
