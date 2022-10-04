import {
  Model,
  DataTypes,
  CreationOptional,
  Association,
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
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import sequelize from '../connection';
import Diary from '@/db/models/diary.model';
import Folder from '@/db/models/folder.models';

export type UserAttributes = {
  id: number;
  nickname: string;
  email: string;
  birthday?: string;
  gender: string;
  access_token: string;
  refresh_token: string;
};

class User extends Model<
  InferAttributes<User, { omit: 'folder' }>,
  InferCreationAttributes<User, { omit: 'folder' }>
> {
  declare id: CreationOptional<number>;
  declare nickname: string;
  declare email: string | null;
  declare birthday: string | null;
  declare gender: string;
  declare access_token: string;
  declare refresh_token: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getFolders: HasManyGetAssociationsMixin<Folder>; // Note the null assertions!
  declare addFolder: HasManyAddAssociationMixin<Folder, number>;
  declare addFolders: HasManyAddAssociationsMixin<Folder, number>;
  declare setFolders: HasManySetAssociationsMixin<Folder, number>;
  declare removeFolder: HasManyRemoveAssociationMixin<Folder, number>;
  declare removeFolders: HasManyRemoveAssociationsMixin<Folder, number>;
  declare hasFolder: HasManyHasAssociationMixin<Folder, number>;
  declare hasFolders: HasManyHasAssociationsMixin<Folder, number>;
  declare countFolders: HasManyCountAssociationsMixin;
  declare createFolder: HasManyCreateAssociationMixin<Folder, 'fid'>;

  declare getDiary: HasManyGetAssociationsMixin<Diary>; // Note the null assertions!
  declare addDiary: HasManyAddAssociationMixin<Diary, number>;
  declare addDiaries: HasManyAddAssociationsMixin<Diary, number>;
  declare setDiaries: HasManySetAssociationsMixin<Diary, number>;
  declare removeDiary: HasManyRemoveAssociationMixin<Diary, number>;
  declare removeDiaries: HasManyRemoveAssociationsMixin<Diary, number>;
  declare hasDiary: HasManyHasAssociationMixin<Diary, number>;
  declare hasDiaries: HasManyHasAssociationsMixin<Diary, number>;
  declare countDiaries: HasManyCountAssociationsMixin;
  declare createDiary: HasManyCreateAssociationMixin<Diary, 'did'>;

  declare folder?: NonAttribute<Folder[]>;
  declare diary?: NonAttribute<Diary[]>;

  declare static associations: {
    folder: Association<User, Folder>;
    diary: Association<User, Diary>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    birthday: {
      type: DataTypes.STRING(10),
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    access_token: DataTypes.STRING(256),
    refresh_token: DataTypes.STRING(256),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'user',
    sequelize,
  },
);

export default User;
