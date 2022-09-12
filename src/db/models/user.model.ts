import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '../connection';

type UserAttributes = {
  id: number;
  nickname: string;
  email: string;
  birthday?: string;
  gender: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserCreationAttribues = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttribues> {
  declare id: CreationOptional<number>;
  declare nickname: string;
  declare email: string | null;
  declare birthday: string | null;
  declare gender: string;

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

// sequelize.sync({ force: true });

export default User;
