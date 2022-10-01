import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '../connection';

export type UserAttributes = {
  id: number;
  nickname: string;
  email: string;
  birthday?: string;
  gender: string;
  access_token: string;
  refresh_token: string;
};

type UserCreationAttribues = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttribues> {
  declare id: CreationOptional<number>;
  declare nickname: string;
  declare email: string | null;
  declare birthday: string | null;
  declare gender: string;
  declare access_token: string;
  declare refresh_token: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    birthday: {
      type: new DataTypes.STRING(10),
    },
    gender: {
      type: new DataTypes.STRING(10),
    },
    access_token: new DataTypes.STRING(256),
    refresh_token: new DataTypes.STRING(256),
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: true,
  },
);

export default User;
