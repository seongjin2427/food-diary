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

  declare diaryId: ForeignKey<Diary['did']>;
  declare diary?: NonAttribute<Diary>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ImageFile.init(
  {
    img_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fileName: {
      type: new DataTypes.STRING(),
    },
    src: {
      type: new DataTypes.STRING(),
    },
    fileSrc: {
      type: new DataTypes.STRING(),
    },
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
