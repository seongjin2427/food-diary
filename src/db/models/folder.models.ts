import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';

import sequelize from '../connection';

type FolderAttributes = {
  fid: number;
  f_title: string;
  f_icon: string;
  f_color: string;
  f_places: string;
};

type FolderCreationAttribues = Optional<FolderAttributes, 'fid'>;

class Folder extends Model<FolderAttributes, FolderCreationAttribues> {
  declare fid: CreationOptional<number>;
  declare f_title: string;
  declare f_icon: string;
  declare f_color: string;
  declare f_places: string;
}

Folder.init(
  {
    fid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    f_title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    f_icon: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    f_color: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    f_places: new DataTypes.STRING(128),
  },
  {
    tableName: 'folder',
    sequelize,
    timestamps: true,
  },
);

Folder.sync();

export default Folder;
