import Folder from '@/db/models/folder.models';
import User from '@/db/models/user.model';
import ImageFile from '@/db/models/imageFile.model';
import Place from '@/db/models/place.model.';
import Diary from '@/db/models/diary.model';

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
  as: 'imagefiles',
});
Diary.hasMany(Place, {
  sourceKey: 'did',
  foreignKey: 'diaryId',
  as: 'places',
});

User.sync();
Folder.sync();
Diary.sync();
ImageFile.sync();
Place.sync();

// User.sync({ force: true });
// Folder.sync({ force: true });
// Diary.sync({ force: true });
// ImageFile.sync({ force: true });
// Place.sync({ force: true });

const models = {
  User,
  ImageFile,
  Folder,
  Place,
  Diary,
};

export default models;
