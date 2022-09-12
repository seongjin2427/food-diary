import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '../connection';

type UserAttributes = {
  id: number;
  name: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserCreationAttribues = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttribues> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
);

export default User;
