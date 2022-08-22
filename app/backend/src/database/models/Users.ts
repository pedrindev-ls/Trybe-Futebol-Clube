import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: false,
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default User;
