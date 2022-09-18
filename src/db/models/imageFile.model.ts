import sequelize from '@/db/connection';
import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';

type ImageFileAttributes = {
  id: number;
  fileName: string;
  src: string;
};

type ImageFileCreationAttributes = Optional<ImageFileAttributes, 'id'>;

class ImageFile extends Model<ImageFileAttributes, ImageFileCreationAttributes> {
  declare id: CreationOptional<number>;
  declare fileName: string;
  declare src: string;
}

ImageFile.init(
  {
    id: {
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
  },
  {
    tableName: 'imagefile',
    sequelize,
    timestamps: true,
  },
);

export default ImageFile;
