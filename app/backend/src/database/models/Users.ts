import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

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
