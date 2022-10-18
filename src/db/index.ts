import User from '@/db/models/user.model';
import Folder from '@/db/models/folder.models';
import ImageFile from '@/db/models/imageFile.model';
import Place from '@/db/models/place.model.';
import Diary from '@/db/models/diary.model';
import DiaryPlace from '@/db/models/diary-place.model';
import FolderPlace from '@/db/models/folder-place.model';
import UserPlace from '@/db/models/user-place.model';

User.hasMany(Folder, {
  sourceKey: 'id',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'folder',
});

User.hasMany(Diary, {
  sourceKey: 'id',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'diary',
});

Diary.hasMany(ImageFile, {
  sourceKey: 'did',
  foreignKey: 'diaryId',
  onDelete: 'CASCADE',
  as: 'images',
});

User.belongsToMany(Place, {
  through: 'UserPlace',
  foreignKey: 'pid',
  as: 'place',
});
Place.belongsToMany(User, {
  through: 'UserPlace',
  foreignKey: 'id',
  as: 'user',
});
Diary.belongsToMany(Place, {
  through: 'DiaryPlace',
  foreignKey: 'pid',
  as: 'places',
});
Place.belongsToMany(Diary, {
  through: 'DiaryPlace',
  foreignKey: 'did',
  as: 'Diary',
});
Folder.belongsToMany(Place, {
  through: 'FolderPlace',
  foreignKey: 'pid',
  as: 'places',
});
Place.belongsToMany(Folder, {
  through: 'FolderPlace',
  foreignKey: 'fid',
  as: 'Folder',
});

User.sync();
Folder.sync();
Diary.sync();
Place.sync();
UserPlace.sync();
ImageFile.sync();
DiaryPlace.sync();
FolderPlace.sync();

// User.sync({ force: true });
// Folder.sync({ force: true });
// Diary.sync({ force: true });
// ImageFile.sync({ force: true });
// Place.sync({ force: true });
// DiaryPlace.sync({ force: true });
// FolderPlace.sync({ force: true });

const models = {
  User,
  ImageFile,
  Folder,
  Place,
  Diary,
};

export default models;
