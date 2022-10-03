import {
  Model,
  DataTypes,
  CreationOptional,
  NonAttribute,
  Association,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from 'sequelize';

import sequelize from '../connection';
import Folder from '@/db/models/folder.models';
import Place from '@/db/models/place.model.';

class FolderPlace extends Model<
  InferAttributes<FolderPlace>,
  InferCreationAttributes<FolderPlace>
> {
  declare fpid: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare folderId: ForeignKey<Folder['fid']>;
  declare folder?: NonAttribute<Folder>;
  
  declare placeId: ForeignKey<Place['pid']>;
  declare place?: NonAttribute<Place>;

  declare static associations: {
    folder: Association<Folder, FolderPlace>;
    place: Association<Place, FolderPlace>;
  };
}

FolderPlace.init(
  {
    fpid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'folder_place',
    sequelize,
  },
);

export default FolderPlace;
