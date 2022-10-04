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
import User from '@/db/models/user.model';

class UserPlace extends Model<InferAttributes<UserPlace>, InferCreationAttributes<UserPlace>> {
  declare upid: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare userId: ForeignKey<User['id']>;
  declare user?: NonAttribute<User>;

  declare placeId: ForeignKey<Place['pid']>;
  declare place?: NonAttribute<Place>;

  declare static associations: {
    user: Association<User, UserPlace>;
    place: Association<Place, UserPlace>;
  };
}

UserPlace.init(
  {
    upid: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'user_place',
    sequelize,
  },
);

export default UserPlace;
