import Folder from '@/db/models/folder.models';
import User from '@/db/models/user.model';
import ImageFile from '@/db/models/imageFile.model';
import Place from '@/db/models/place.model.';

User.hasMany(Folder, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'folder',
});
// Folder.belongsTo(User, {
//   foreignKey: 'folderId',
//   targetKey: 'fid',
// });

User.sync();
Folder.sync();
// User.sync({ force: true });
// Folder.sync({ force: true });

const models = {
  User,
  ImageFile,
  Folder,
  Place,
};

export default models;
