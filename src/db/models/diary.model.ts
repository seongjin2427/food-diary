import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';

import sequelize from '../connection';

type DiaryAttributes = {
  did: number;
  d_title: string;
  d_content: string;
  d_date: string;
  d_places: string;
  d_thumbnail: string;
  d_images: string;
  d_menus: string;
  d_memo: string;
};

type DiaryCreationAttribues = Optional<DiaryAttributes, 'did'>;

class Diary extends Model<DiaryAttributes, DiaryCreationAttribues> {
  declare did: CreationOptional<number>;
  declare d_title: string;
  declare d_content: string;
  declare d_date: string;
  declare d_places: string;
  declare d_thumbnail: string;
  declare d_images: string;
  declare d_menus: string;
  declare d_memo: string;
}

Diary.init(
  {
    did: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    d_title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    d_content: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    d_date: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    d_places: new DataTypes.STRING(128),
    d_thumbnail: new DataTypes.STRING(128),
    d_images: new DataTypes.STRING(128),
    d_menus: new DataTypes.STRING(128),
    d_memo: new DataTypes.STRING(),
  },
  {
    tableName: 'diary',
    sequelize,
    timestamps: true,
  },
);

export default Diary;
