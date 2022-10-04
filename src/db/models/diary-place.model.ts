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
import Place from '@/db/models/place.model.';
import Diary from '@/db/models/diary.model';

class DiaryPlace extends Model<InferAttributes<DiaryPlace>, InferCreationAttributes<DiaryPlace>> {
  declare dpid: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare diaryId: ForeignKey<Diary['did']>;
  declare diary?: NonAttribute<Diary>;

  declare placeId: ForeignKey<Place['pid']>;
  declare place?: NonAttribute<Place>;

  declare static associations: {
    diary: Association<Diary, DiaryPlace>;
    place: Association<Place, DiaryPlace>;
  };
}

DiaryPlace.init(
  {
    dpid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'diary_place',
    sequelize,
  },
);

export default DiaryPlace;
