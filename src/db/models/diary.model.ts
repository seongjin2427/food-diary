import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';

import sequelize from '../connection';

type DiaryAttributes = {
  id: number;
  title: string;
  content: string;
  date: string;
  places: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type DiaryCreationAttribues = Optional<DiaryAttributes, 'id'>;

class Diary extends Model<DiaryAttributes, DiaryCreationAttribues> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare date: string;
  declare places: string;
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
    date: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    places: new DataTypes.STRING(256),
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
    tableName: 'diary',
    sequelize,
  },
);

export default Diary;
