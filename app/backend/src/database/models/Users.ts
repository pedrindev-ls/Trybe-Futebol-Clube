import { Sequelize } from 'sequelize/types';
import { DataTypes, Model } from 'sequelize';

class User extends Model {}

User.init({
  id: DataTypes.INTEGER,
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: false,
  sequelize: new Sequelize(),
});

export default User;
