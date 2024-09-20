import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
  CIVIL_ESCROW_AGREEMENT_BENEFICIARY_DATA,
  CIVIL_ESCROW_AGREEMENT_DEPONENT_DATA,
  ESCROW_PAYMENT_OPERATION_DATA,
  TAX_ATTRIBUTES_DATA,
} from 'src/_common/components/AttributeBackendTable/BackendTableData';
import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import { v4 as uuidv4 } from 'uuid';

export interface IAttributeBackendTableRecord {
  key: string;
  attribute: string;
  name: string;
  type: string;
  required: string;
  description: ITag[];
}

interface IAttributeBackendTableState {
  data: IAttributeBackendTableRecord[];
  recordEditKey: string | null;
}

const initialState: IAttributeBackendTableState = {
  data: [],
  recordEditKey: null,
};

const backendTableData: { [key in string]: IAttributeBackendTableRecord[] } = {
  escrowPaymentOperation: ESCROW_PAYMENT_OPERATION_DATA,
  civilEscrowAgreementDeponent: CIVIL_ESCROW_AGREEMENT_DEPONENT_DATA,
  civilEscrowAgreementBeneficiary: CIVIL_ESCROW_AGREEMENT_BENEFICIARY_DATA,
  taxAttributes: TAX_ATTRIBUTES_DATA,
};

export const attributeBackendTable = createSlice({
  name: 'attributeBackendTable',
  initialState,
  reducers: {
    setAddAttributeBackendTable: (state, action: PayloadAction<{ backendTableName: string }>) => {
      const { backendTableName } = action.payload;
      state.data = backendTableData[backendTableName];
    },
    updateAttributeBackendTableCell: (
      state,
      action: PayloadAction<{ index: number; dataIndex: string; updateData: string | ITag[] }>
    ) => {
      const { index, dataIndex, updateData } = action.payload;
      state.data[index][dataIndex] = updateData;
    },
    addAttributeBackendTableRecord: (state) => {
      state.data.push({
        key: uuidv4(),
        attribute: 'Имя атрибута',
        name: 'Наименование поля',
        type: 'Тип данных',
        required: 'М',
        description: [{ id: uuidv4(), name: 'Расширенное описание', type: ETagTypes.INPUT }],
      });
    },
    deleteAttributeBackendTableRecord: (state, action: PayloadAction<{ key: string }>) => {
      const { key } = action.payload;
      state.data = state.data.filter((item) => item.key !== key);
    },
  },
  selectors: {
    getAttributeBackendTableData: (state) => state.data,
  },
});

export const {
  setAddAttributeBackendTable,
  updateAttributeBackendTableCell,
  addAttributeBackendTableRecord,
  deleteAttributeBackendTableRecord,
} = attributeBackendTable.actions;
export const { getAttributeBackendTableData } = attributeBackendTable.selectors;
