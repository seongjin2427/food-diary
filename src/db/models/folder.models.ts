import User from '@/db/models/user.model';
import {
  Model,
  DataTypes,
  Optional,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';

import sequelize from '../connection';

type FolderAttributes = {
  fid: number;
  f_title: string;
  f_icon: string;
  f_color: string;
  f_places: string;
};

type FolderCreationAttribues = Optional<FolderAttributes, 'fid'>;

class Folder extends Model<InferAttributes<Folder>, InferCreationAttributes<Folder>> {
  declare fid: CreationOptional<number>;
  declare f_title: string;
  declare f_icon: string;
  declare f_color: string;
  declare f_places: string;

  declare userId: ForeignKey<User['id']>;
  declare user?: NonAttribute<User>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Folder.init(
  {
    fid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    f_title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    f_icon: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    f_color: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    f_places: DataTypes.STRING(128),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'folder',
    sequelize,
    timestamps: true,
  },
);

export default Folder;
