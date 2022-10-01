import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';

import GlobalReducer from '@/store/global';
import DiaryReducer from '@/store/diary/diarySlice';
import FolderReducer from '@/store/diary/folderSlice';
import AdditinoalInfoReducer from '@/store/diary/additionalInfoSlice';

export const store = configureStore({
  reducer: {
    global: GlobalReducer,
    diary: DiaryReducer,
    folder: FolderReducer,
    additionalInfo: AdditinoalInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
