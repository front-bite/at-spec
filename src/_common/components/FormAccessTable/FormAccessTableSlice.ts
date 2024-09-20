import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';

export interface IFormAccessTableRow {
  key: string;
  actionsOnForm: string;
  permissionCode: string;
}

interface IFormAccessTableState {
  data: IFormAccessTableRow[];
  editKey: string | null;
}

const initialState: IFormAccessTableState = {
  data: [
    {
      key: uuidv4(),
      actionsOnForm: 'Открытие формы',
      permissionCode: 'PRMISSION_VIEW',
    },
    {
      key: uuidv4(),
      actionsOnForm: 'Создание формы',
      permissionCode: 'PRMISSION_CREATE',
    },
  ],
  editKey: null,
};

export const formAccessTable = createSlice({
  name: 'formAccessTable',
  initialState,
  reducers: {
    /** Сеттинг значения редактируемого ключа строки таблицы. */
    setEditKey: (state, acttion: PayloadAction<{ key: string | null }>) => {
      state.editKey = acttion.payload.key;
    },
    /** Обновление строки в таблице. */
    updateFormAccessTableRow: (state, action: PayloadAction<{ key: string | null; row: IFormAccessTableRow }>) => {
      const { key, row } = action.payload;
      const index = state.data.findIndex((item) => item.key === key);
      state.data[index] = { ...state.data[index], ...row };
      state.editKey = null;
    },
    /** Удаление строки в таблице. */
    deleteFormAccessTableRow: (state, acction: PayloadAction<{ key: string | null }>) => {
      const { key } = acction.payload;
      state.data = state.data.filter((item) => item.key !== key);
    },
    /** Добавление новой строки в таблицу. */
    addFormAccessTableRow: (state) => {
      state.data.push({
        key: uuidv4(),
        actionsOnForm: 'Новое_действие',
        permissionCode: 'NEW_PERMISSION',
      });
    },
  },
  selectors: {
    getFormAccessTableData: (state) => state.data,
    getFormAccessTableEditKey: (state) => state.editKey,
  },
});

export const { setEditKey, updateFormAccessTableRow, deleteFormAccessTableRow, addFormAccessTableRow } =
  formAccessTable.actions;
export const { getFormAccessTableData, getFormAccessTableEditKey } = formAccessTable.selectors;
