import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import { LOADING_SCREEN_FORM_DATA_LIST } from 'src/_common/components/ListWithConditions/consts';
import { v4 as uuidv4 } from 'uuid';

interface ILoadingScreenFormState {
  list: Array<ITag[]>;
}

const initialState: ILoadingScreenFormState = {
  list: LOADING_SCREEN_FORM_DATA_LIST,
};

export const loadingScreenForm = createSlice({
  name: 'loadingScreenForm',
  initialState,
  reducers: {
    /** Обновление элемента списка при сохранении. */
    updateLoadingScreenFormListItem: (
      state,
      action: PayloadAction<{ selectedItemDragDropEditDrawer: ITag[]; indexRecordDragDropEditDrawer: number | null }>
    ) => {
      const { selectedItemDragDropEditDrawer, indexRecordDragDropEditDrawer } = action.payload;
      if (indexRecordDragDropEditDrawer !== null) {
        state.list[indexRecordDragDropEditDrawer] = selectedItemDragDropEditDrawer;
      }
    },
    /** Удаление элемента из списка по его индексу. */
    deleteLoadingScreenFormListItem: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.list.splice(index, 1);
    },
    /** Добавление нового элемента в список (массив с тегом). */
    addNewItemToList: (state) => {
      state.list.push([{ id: uuidv4(), name: 'Новый элемент списка', type: ETagTypes.INPUT }]);
    },
    updateListOrder: (state, action: PayloadAction<{ draggedIndex: number; targetIndex: number }>) => {
      const { draggedIndex, targetIndex } = action.payload;

      const updatedList = [...state.list];
      const [movedItem] = updatedList.splice(draggedIndex, 1);
      updatedList.splice(targetIndex, 0, movedItem);

      state.list = updatedList;
    },
  },
  selectors: {
    getListLoadingScreenForm: (state) => state.list,
  },
});

export const { updateLoadingScreenFormListItem, deleteLoadingScreenFormListItem, addNewItemToList, updateListOrder } =
  loadingScreenForm.actions;
export const { getListLoadingScreenForm } = loadingScreenForm.selectors;
