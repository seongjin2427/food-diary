import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';

import sequelize from '../connection';

type PlaceAttributes = {
  pid: number;
  place_id: string;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type PlaceCreationAttribues = Optional<PlaceAttributes, 'pid'>;

class Place extends Model<PlaceAttributes, PlaceCreationAttribues> {
  declare pid: CreationOptional<number>;
  declare place_id: string;
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
}

Place.init(
  {
    pid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    place_id: new DataTypes.STRING(128),
    address_name: new DataTypes.STRING(128),
    category_group_code: new DataTypes.STRING(),
    category_group_name: new DataTypes.STRING(128),
    category_name: new DataTypes.STRING(128),
    distance: new DataTypes.STRING(128),
    phone: new DataTypes.STRING(128),
    place_name: new DataTypes.STRING(128),
    place_url: new DataTypes.STRING(128),
    road_address_name: new DataTypes.STRING(128),
    x: new DataTypes.STRING(128),
    y: new DataTypes.STRING(128),
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
    tableName: 'place',
    sequelize,
  },
);

Place.sync();

export default Place;
