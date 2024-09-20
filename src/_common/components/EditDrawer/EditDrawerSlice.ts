import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { EEditTable } from 'src/_common/components/DragDropEdit/DragDropEditSlice';

export enum EEditType {
  DND = 'DND',
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  TREE_SELECT = 'TREE_SELECT',
}

interface IEditDrawerState {
  selectValueEditDrawer: string;
  inputValueEditDrawer: string;
  indexRecordEditDrawer: number | null;
  dataIndexRecordEditDrawer: string | null;
  editType: EEditType | null;
  editTable: EEditTable | null;
}

const initialState: IEditDrawerState = {
  selectValueEditDrawer: '',
  inputValueEditDrawer: '',
  indexRecordEditDrawer: null,
  dataIndexRecordEditDrawer: null,
  editType: null,
  editTable: null,
};

export const editDrawer = createSlice({
  name: 'editDrawer',
  initialState,
  reducers: {
    /** Сеттинг значения селекта выбранного для редактирования элемента. */
    setSelectValueEditDrawer: (state, action: PayloadAction<{ selectValue: string; editType: EEditType }>) => {
      const { selectValue, editType } = action.payload;
      state.selectValueEditDrawer = selectValue;
      state.editType = editType;
      state.inputValueEditDrawer = '';
    },
    /** Сеттинг значения селекта выбранного для редактирования элемента. */
    setInputValueEditDrawer: (state, action: PayloadAction<{ inputValue: string; editType: EEditType }>) => {
      const { inputValue, editType } = action.payload;
      state.inputValueEditDrawer = inputValue;
      state.editType = editType;
      state.selectValueEditDrawer = '';
    },
    /** Сеттинг индекса записи (строки) таблицы для редактирования элемента. */
    setIndexRecordEditDrawer: (state, action: PayloadAction<number | null>) => {
      state.indexRecordEditDrawer = action.payload;
    },
    /** Сеттинг dataIndex ячейки таблицы для редактирования элемента. */
    setDataIndexRecordEditDrawer: (state, action: PayloadAction<string | null>) => {
      state.dataIndexRecordEditDrawer = action.payload;
    },
    /** Обновление данных ячеки с типом INPUT в таблице. */
    updateInputValueEditDrawer: (state, action: PayloadAction<string>) => {
      state.inputValueEditDrawer = action.payload;
    },
    /** Обновление данных ячеки с типом SELECT в таблице. */
    updateSelectValueEditDrawer: (state, action: PayloadAction<string>) => {
      state.selectValueEditDrawer = action.payload;
    },
    /** Очистка всех дравера редактирования. */
    clearEditDrawer: () => initialState,
    setEditTableEditDrawer: (state, action: PayloadAction<EEditTable>) => {
      state.editTable = action.payload;
    },
  },
  selectors: {
    getSelectValueEditDrawer: (state) => state.selectValueEditDrawer,
    getInputValueEditDrawer: (state) => state.inputValueEditDrawer,
    getIndexRecordEditDrawer: (state) => state.indexRecordEditDrawer,
    getDataIndexRecordEditDrawer: (state) => state.dataIndexRecordEditDrawer,
    getEditTypeEditDrawer: (state) => state.editType,
    getEditTableEditDrawer: (state) => state.editTable,
  },
});

export const {
  setSelectValueEditDrawer,
  setInputValueEditDrawer,
  setIndexRecordEditDrawer,
  setDataIndexRecordEditDrawer,
  updateInputValueEditDrawer,
  updateSelectValueEditDrawer,
  clearEditDrawer,
  setEditTableEditDrawer,
} = editDrawer.actions;
export const {
  getSelectValueEditDrawer,
  getInputValueEditDrawer,
  getIndexRecordEditDrawer,
  getDataIndexRecordEditDrawer,
  getEditTypeEditDrawer,
  getEditTableEditDrawer,
} = editDrawer.selectors;
