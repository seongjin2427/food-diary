import User from '@/db/models/user.model';
import Folder from '@/db/models/folder.models';
import ImageFile from '@/db/models/imageFile.model';
import Place from '@/db/models/place.model.';
import Diary from '@/db/models/diary.model';
import DiaryPlace from '@/db/models/diary-place.model';
import FolderPlace from '@/db/models/folder-place.model';

User.hasMany(Folder, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'folder',
});
User.hasMany(Diary, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'diary',
});

Diary.hasMany(ImageFile, {
  sourceKey: 'did',
  foreignKey: 'diaryId',
  onDelete: 'CASCADE',
  as: 'ImageFile',
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
