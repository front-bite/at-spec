import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import type { EEditType } from 'src/_common/components/EditDrawer/EditDrawerSlice';
import { v4 as uuidv4 } from 'uuid';

export enum EEditTable {
  BACKEND_TABLE = 'BACKEND_TABLE',
  FRONTEND_TABLE = 'FRONTEND_TABLE',
  LOADING_SCREEN_FORM = 'LOADING_SCREEN_FORM',
}

/**
 * Интерфейс начального состояния Drag&Drop редактирования.
 *
 * @property {ITag[]} selectedItemDragDropEditDrawer Выбранный элемент (массив тегов) для редактирования.
 * @property {number | null} indexRecordDragDropEditDrawer Индекс выбранного элемента.
 */
interface IDragDropEditState {
  selectedItemDragDropEditDrawer: ITag[];
  indexRecordDragDropEditDrawer: number | null;
  dataIndexRecordDragDropEditDrawer: string | null;
  editType: EEditType | null;
  editTable: EEditTable | null;
}

const initialState: IDragDropEditState = {
  selectedItemDragDropEditDrawer: [],
  indexRecordDragDropEditDrawer: null,
  dataIndexRecordDragDropEditDrawer: null,
  editType: null,
  editTable: null,
};

export const dragDropEdit = createSlice({
  name: 'dragDropEdit',
  initialState,
  reducers: {
    /** Сеттинг значения выбранного для редактирования элемента из списка. */
    setSelectedItemDragDropEditDrawer: (state, action: PayloadAction<ITag[]>) => {
      state.selectedItemDragDropEditDrawer = action.payload;
    },
    /** Сеттинг индекса выбранного для редактирования элемента из списка. */
    setIndexRecordDragDropEditDrawer: (state, action: PayloadAction<number | null>) => {
      state.indexRecordDragDropEditDrawer = action.payload;
    },
    /** Сеттинг dataIndex ячейки таблицы для редактирования элемента. */
    setDataIndexRecordDragDropEditDrawer: (state, action: PayloadAction<string | null>) => {
      state.dataIndexRecordDragDropEditDrawer = action.payload;
    },
    /** Сеттинг типа редактирования ячейки таблицы. */
    setEditTypeDragDropEditDrawer: (state, action: PayloadAction<{ editType: EEditType }>) => {
      const { editType } = action.payload;
      state.editType = editType;
    },
    /** Изменение позиции тега в массиве тегов. */
    changeTagPosition: (state, action: PayloadAction<{ fromId: string; toId: string }>) => {
      const { fromId, toId } = action.payload;
      const fromIndex = state.selectedItemDragDropEditDrawer.findIndex((tag: ITag) => tag.id === fromId);
      const toIndex = state.selectedItemDragDropEditDrawer.findIndex((tag: ITag) => tag.id === toId);
      const updatedTags = [...state.selectedItemDragDropEditDrawer];
      updatedTags.splice(toIndex, 0, updatedTags.splice(fromIndex, 1)[0]);
      state.selectedItemDragDropEditDrawer = updatedTags;
    },
    /** Создание по клику тегов типа CONDITIONAL и INPUT */
    createConditionalAndInputTag: (state, action: PayloadAction<ITag>) => {
      const newTag = { ...action.payload, id: uuidv4() };
      state.selectedItemDragDropEditDrawer.push(newTag);
    },
    /** Создание по клику тегов типа MODEL */
    createModelTag: (state, action: PayloadAction<string>) => {
      state.selectedItemDragDropEditDrawer.push({ id: uuidv4(), name: action.payload, type: ETagTypes.MODEL });
    },
    /** Удаление тега с поля Drag&Drop с любым типов по клику на иконку крестика. */
    deleteTag: (state, action: PayloadAction<string>) => {
      state.selectedItemDragDropEditDrawer = state.selectedItemDragDropEditDrawer.filter(
        (tag) => tag.id !== action.payload
      );
    },
    /** Редактирование тега типа INPUT. */
    editInputTag: (state, action: PayloadAction<{ tagId: string; newName: string }>) => {
      state.selectedItemDragDropEditDrawer = state.selectedItemDragDropEditDrawer.map((tag) =>
        tag.id === action.payload.tagId ? { ...tag, name: action.payload.newName } : tag
      );
    },
    /** Очистка поля Drag&Drop компоновки тегов. */
    clearDragDropField: (state) => {
      state.selectedItemDragDropEditDrawer = initialState.selectedItemDragDropEditDrawer;
    },
    /** Полная очистка окна Drag&Drop редактирования. */
    clearAllDragDrop: () => initialState,
    setEditTableDragDropEditDrawer: (state, action: PayloadAction<EEditTable>) => {
      state.editTable = action.payload;
    },
  },
  selectors: {
    getSelectedItemEdit: (state) => state.selectedItemDragDropEditDrawer,
    getindexRecordDragDropEditDrawer: (state) => state.indexRecordDragDropEditDrawer,
    getDataIndexRecordDragDropEditDrawer: (state) => state.dataIndexRecordDragDropEditDrawer,
    getEditTypeDragDropEditDrawer: (state) => state.editType,
    getEditTableDragDropEditDrawer: (state) => state.editTable,
  },
});

export const {
  setSelectedItemDragDropEditDrawer,
  setEditTypeDragDropEditDrawer,
  setIndexRecordDragDropEditDrawer,
  setDataIndexRecordDragDropEditDrawer,
  changeTagPosition,
  createConditionalAndInputTag,
  createModelTag,
  deleteTag,
  editInputTag,
  clearDragDropField,
  clearAllDragDrop,
  setEditTableDragDropEditDrawer,
} = dragDropEdit.actions;
export const {
  getSelectedItemEdit,
  getindexRecordDragDropEditDrawer,
  getDataIndexRecordDragDropEditDrawer,
  getEditTypeDragDropEditDrawer,
  getEditTableDragDropEditDrawer,
} = dragDropEdit.selectors;
