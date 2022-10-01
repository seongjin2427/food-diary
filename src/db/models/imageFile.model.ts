import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/db/connection';

type ImageFileAttributes = {
  img_id: number;
  fileName: string;
  src: string;
  fileSrc: string;
};

type ImageFileCreationAttributes = Optional<ImageFileAttributes, 'img_id'>;

class ImageFile extends Model<ImageFileAttributes, ImageFileCreationAttributes> {
  declare img_id: CreationOptional<number>;
  declare fileName: string;
  declare src: string;
  declare fileSrc: string;
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
  },
  {
    tableName: 'imagefile',
    sequelize,
    timestamps: true,
  },
);

ImageFile.sync();

export default ImageFile;
