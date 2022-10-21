import instance from '@/api/instance';

export const removeFolderApi = async (fid: number) => {
  try {
    const { data } = await instance.post('/api/folder/remove-folder', { fid });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
