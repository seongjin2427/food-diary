import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import sequelize from '../connection';
import Diary from '@/db/models/diary.model';
import Folder from '@/db/models/folder.models';

class Place extends Model<InferAttributes<Place>, InferCreationAttributes<Place>> {
  declare pid: CreationOptional<number>;
  declare id: string;
  declare address_name: string;
  declare category_group_code: string;
  declare category_group_name: string;
  declare category_name: string;
  declare distance: string;
  declare phone: string;
  declare place_name: string;
  declare place_url: string;
  declare road_address_name: string;
  declare x: string;
  declare y: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare diaryId: ForeignKey<Diary['did']>;

  declare folderId: ForeignKey<Folder['fid']>;
}

Place.init(
  {
    pid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id: DataTypes.STRING(128),
    address_name: DataTypes.STRING(128),
    category_group_code: DataTypes.STRING(),
    category_group_name: DataTypes.STRING(128),
    category_name: DataTypes.STRING(128),
    distance: DataTypes.STRING(128),
    phone: DataTypes.STRING(128),
    place_name: DataTypes.STRING(128),
    place_url: DataTypes.STRING(128),
    road_address_name: DataTypes.STRING(128),
    x: DataTypes.STRING(128),
    y: DataTypes.STRING(128),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'place',
    sequelize,
    timestamps: true,
  },
);

export default Place;
