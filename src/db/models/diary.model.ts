import {
  Model,
  DataTypes,
  CreationOptional,
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
  NonAttribute,
  Association,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from 'sequelize';

import sequelize from '../connection';
import ImageFile from '@/db/models/imageFile.model';
import Place from '@/db/models/place.model.';
import User from '@/db/models/user.model';

class Diary extends Model<
  InferAttributes<Diary, { omit: 'imagefile' & ' place' }>,
  InferCreationAttributes<Diary, { omit: 'imagefile' & ' place' }>
> {
  declare did: CreationOptional<number>;
  declare d_title: string;
  declare d_content: string;
  declare d_date: Date;
  declare d_thumbnail: string;
  declare d_menus: string;
  declare d_memo: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getImageFiles: HasManyGetAssociationsMixin<ImageFile>; // Note the null assertions!
  declare addImageFile: HasManyAddAssociationMixin<ImageFile, number>;
  declare addImageFiles: HasManyAddAssociationsMixin<ImageFile, number>;
  declare setImageFiles: HasManySetAssociationsMixin<ImageFile, number>;
  declare removeImageFile: HasManyRemoveAssociationMixin<ImageFile, number>;
  declare removeImageFiles: HasManyRemoveAssociationsMixin<ImageFile, number>;
  declare hasImageFile: HasManyHasAssociationMixin<ImageFile, number>;
  declare hasImageFiles: HasManyHasAssociationsMixin<ImageFile, number>;
  declare countImageFiles: HasManyCountAssociationsMixin;
  declare makeImageFile: HasManyCreateAssociationMixin<ImageFile, 'img_id'>;

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

  declare ImageFile?: NonAttribute<ImageFile[]>;
  declare places?: NonAttribute<Place[]>;

  declare static associations: {
    places: Association<Diary, Place>;
    ImageFile: Association<Diary, ImageFile>;
  };
}

Diary.init(
  {
    did: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    d_title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    d_content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    d_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    d_thumbnail: DataTypes.STRING(128),
    d_menus: DataTypes.STRING(128),
    d_memo: DataTypes.STRING(),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'diary',
    sequelize,
  },
);

export default Diary;
