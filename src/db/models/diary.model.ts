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
  declare title: string;
  declare content: string;
  declare date: Date;
  declare thumbnail: string;
  declare menus: string;
  declare memo: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getImages: HasManyGetAssociationsMixin<ImageFile>; // Note the null assertions!
  declare addImage: HasManyAddAssociationMixin<ImageFile, number>;
  declare addImages: HasManyAddAssociationsMixin<ImageFile, number>;
  declare setImages: HasManySetAssociationsMixin<ImageFile, number>;
  declare removeImage: HasManyRemoveAssociationMixin<ImageFile, number>;
  declare removeImages: HasManyRemoveAssociationsMixin<ImageFile, number>;
  declare hasImage: HasManyHasAssociationMixin<ImageFile, number>;
  declare hasImages: HasManyHasAssociationsMixin<ImageFile, number>;
  declare countImages: HasManyCountAssociationsMixin;
  declare createImages: HasManyCreateAssociationMixin<ImageFile, 'img_id'>;

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

  declare images?: NonAttribute<ImageFile[]>;
  declare places?: NonAttribute<Place[]>;

  declare static associations: {
    places: Association<Diary, Place>;
    images: Association<Diary, ImageFile>;
  };
}

Diary.init(
  {
    did: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    thumbnail: DataTypes.STRING(128),
    menus: DataTypes.STRING(128),
    memo: DataTypes.STRING(),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'diary',
    sequelize,
  },
);

export default Diary;
