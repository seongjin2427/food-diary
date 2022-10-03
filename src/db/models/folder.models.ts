import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
} from 'sequelize';

import sequelize from '../connection';
import User from '@/db/models/user.model';
import Place from '@/db/models/place.model.';

class Folder extends Model<InferAttributes<Folder>, InferCreationAttributes<Folder>> {
  declare fid: CreationOptional<number>;
  declare title: string;
  declare icon: string;
  declare color: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getPlaces: HasManyGetAssociationsMixin<Place>; // Note the null assertions!
  declare addPlace: HasManyAddAssociationMixin<Place, number>;
  declare addPlaces: HasManyAddAssociationsMixin<Place, number>;
  declare setPlaces: HasManySetAssociationsMixin<Place, number>;
  declare removePlace: HasManyRemoveAssociationMixin<Place, number>;
  declare removePlaces: HasManyRemoveAssociationsMixin<Place, number>;
  declare hasPlace: HasManyHasAssociationMixin<Place, number>;
  declare hasPlaces: HasManyHasAssociationsMixin<Place, number>;
  declare countPlaces: HasManyCountAssociationsMixin;
  declare createPlace: HasManyCreateAssociationMixin<Place, 'pid'>;

  declare userId: ForeignKey<User['id']>;
  declare user?: NonAttribute<User>;

  declare places?: NonAttribute<Place[]>;

  declare static associations: {
    places: Association<Folder, Place>;
  };
}

Folder.init(
  {
    fid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
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
