import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '../connection';

type DiaryAttributes = {
  id: number;
  title: string;
  content: string;
  address: string;
  longitude: string;
  latitude: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type DiaryCreationAttribues = Optional<DiaryAttributes, 'id'>;

class Diary extends Model<DiaryAttributes, DiaryCreationAttribues> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare address: string;
  declare longitude: string;
  declare latitude: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Diary.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    address: new DataTypes.STRING(128),
    longitude: new DataTypes.STRING(128),
    latitude: new DataTypes.STRING(128),
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

export default Diary;
