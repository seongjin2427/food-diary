import { useAppDispatch } from '@/store/index';
import { clearAdditionalInfo } from '@/store/diary/additionalInfoSlice';
import { clearDiary } from '@/store/diary/diarySlice';
import { clearFolder } from '@/store/diary/folderSlice';
import { offDiaryModifyMode } from '@/store/global';
import { clearSearchStates } from '@/store/search/searchSlice';

const useReduxReset = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(clearDiary());
    dispatch(clearAdditionalInfo());
    dispatch(clearFolder());
    dispatch(offDiaryModifyMode());
    dispatch(clearSearchStates());
  };
};

export default useReduxReset;
