import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';

import sequelize from '@/db/connection';
import Diary from '@/db/models/diary.model';

class ImageFile extends Model<InferAttributes<ImageFile>, InferCreationAttributes<ImageFile>> {
  declare img_id: CreationOptional<number>;
  declare fileName: string;
  declare src: string;
  declare fileSrc: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare diaryId: ForeignKey<Diary['did']>;
  declare diary?: NonAttribute<Diary>;
}

ImageFile.init(
  {
    img_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: DataTypes.STRING(256),
    src: DataTypes.STRING(256),
    fileSrc: DataTypes.STRING(256),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'imagefile',
    sequelize,
    timestamps: true,
  },
);

export default ImageFile;
