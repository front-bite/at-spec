import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import { EAvailabilityFields, EUiComponents } from 'src/_common/components/EditDrawer/EditDrawerConsts';
import { v4 as uuidv4 } from 'uuid';

export enum EFrontendTableTabs {
  GENERAL_PARAMETERS = 'generalParameters',
  PAYER = 'payer',
  RECIPIENT = 'recipient',
}

export interface IFrontendTableTab {
  value: string;
  label: string;
}

export interface IFrontendTableRecord {
  key: string;
  nameElement: string;
  uiComponent: string;
  availabilityFields: string;
  logic: ITag[];
  creation: ITag[];
  editing: ITag[];
  mappingUpdating: ITag[];
}

interface IFrontendTableState {
  tablesData: Record<string, IFrontendTableRecord[]>;
  availableTabs: IFrontendTableTab[];
  activeTab: EFrontendTableTabs | string | null;
  openTabModal: boolean;
}

const initialState: IFrontendTableState = {
  tablesData: {
    generalParameters: [
      {
        key: uuidv4(),
        nameElement: 'Дата операции',
        uiComponent: EUiComponents.DATA_PICKER,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [{ id: uuidv4(), name: 'Заполение даты с бэкенда', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: 'EscrowPaymentOperation.activationDate', type: ETagTypes.MODEL }],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.activationDate', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowPaymentOperation.activationDate', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Номер распоряжения',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.READ_ONLY,
        logic: [
          {
            id: uuidv4(),
            name: 'Номер распоряжения заполняется на Бэке,  после создания операции формируется запись в БД',
            type: ETagTypes.INPUT,
          },
        ],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.documentNumber', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowPaymentOperation.documentNumber', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Бенефициар',
        uiComponent: EUiComponents.SELECT,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          {
            id: uuidv4(),
            name: '-',
            type: ETagTypes.INPUT,
          },
        ],
        creation: [{ id: uuidv4(), name: 'EscrowPaymentOperation.beneficiary', type: ETagTypes.MODEL }],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.beneficiary', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowPaymentOperation.beneficiary', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Сумма',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          {
            id: uuidv4(),
            name: '-',
            type: ETagTypes.INPUT,
          },
        ],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.amount', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowPaymentOperation.amount', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Код валютной операции',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          {
            id: uuidv4(),
            name: 'maxLength: 5, но обрезать описание на 10 символов',
            type: ETagTypes.INPUT,
          },
        ],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.currencyOperationCode', type: ETagTypes.MODEL }],
        mappingUpdating: [
          { id: uuidv4(), name: 'EscrowPaymentOperation.currencyOperationCode', type: ETagTypes.MODEL },
        ],
      },
      {
        key: uuidv4(),
        nameElement: 'Уникальный идентификатор платежа (УИП)',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          {
            id: uuidv4(),
            name: '-',
            type: ETagTypes.INPUT,
          },
        ],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.uip', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowPaymentOperation.uip', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Лексема',
        uiComponent: EUiComponents.DICTIONARY_SELECT,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          {
            id: uuidv4(),
            name: 'Поле необязательное для заполнения, поэтому select должен иметь возможность очистить ранее выбранное значение.',
            type: ETagTypes.INPUT,
          },
        ],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.uip', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowPaymentOperation.uip', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Не проводить',
        uiComponent: EUiComponents.CHECKBOX,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          {
            id: uuidv4(),
            name: '-',
            type: ETagTypes.INPUT,
          },
        ],
        creation: [
          { id: uuidv4(), name: 'ЕСЛИ', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'EscrowPaymentOperation.amount', type: ETagTypes.MODEL },
          { id: uuidv4(), name: '!=', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'RUB', type: ETagTypes.INPUT },
          { id: uuidv4(), name: 'TO', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'установить', type: ETagTypes.INPUT },
          { id: uuidv4(), name: 'EscrowPaymentOperation.noProcessing', type: ETagTypes.MODEL },
          { id: uuidv4(), name: '===', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'TRUE', type: ETagTypes.CONDITIONAL },
        ],
        editing: [{ id: uuidv4(), name: 'EscrowPaymentOperation.noProcessing', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowPaymentOperation.noProcessing', type: ETagTypes.MODEL }],
      },
    ],
    payer: [
      {
        key: uuidv4(),
        nameElement: 'Наименование плательщика',
        uiComponent: EUiComponents.INPUT,
        availabilityFields: EAvailabilityFields.NO_UI,
        logic: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.name', type: ETagTypes.MODEL }],
        editing: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.name', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.name', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Счёт плательщика',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.NO_UI,
        logic: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.escrowAccount', type: ETagTypes.MODEL }],
        editing: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.escrowAccount', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.escrowAccount', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'ИНН плательщика',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.NO_UI,
        logic: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.taxId', type: ETagTypes.MODEL }],
        editing: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.taxId', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.taxId', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'КПП плательщика',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.NO_UI,
        logic: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.kpp', type: ETagTypes.MODEL }],
        editing: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.kpp', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'CivilEscrowAgreementDeponent.kpp', type: ETagTypes.MODEL }],
      },
    ],
    recipient: [
      {
        key: uuidv4(),
        nameElement: 'Получатель',
        uiComponent: EUiComponents.RADIO_BUTTON,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          {
            id: uuidv4(),
            name: 'Логика переключения реализуется на фронте исходя из наличия третьей стороны:',
            type: ETagTypes.INPUT,
          },
          { id: uuidv4(), name: 'ЕСЛИ', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'EscrowPaymentOperation.thirdParty', type: ETagTypes.MODEL },
          { id: uuidv4(), name: '===', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'NULL TO', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'Бенефициар', type: ETagTypes.INPUT },
          { id: uuidv4(), name: 'ИНАЧЕ', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'EscrowPaymentOperation.thirdParty', type: ETagTypes.MODEL },
          { id: uuidv4(), name: '!=', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'NULL TO', type: ETagTypes.CONDITIONAL },
          { id: uuidv4(), name: 'Третья сторона', type: ETagTypes.INPUT },
        ],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        mappingUpdating: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
      },
      {
        key: uuidv4(),
        nameElement: 'Наименование получателя',
        uiComponent: EUiComponents.INPUT,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'CivilEscrowAgreementBeneficiary.name', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'CivilEscrowAgreementBeneficiary.name', type: ETagTypes.MODEL }],
      },
      {
        key: uuidv4(),
        nameElement: 'Тип счёта',
        uiComponent: EUiComponents.DICTIONARY_SELECT,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [
          { id: uuidv4(), name: 'Справочник:', type: ETagTypes.INPUT },
          { id: uuidv4(), name: 'EscrowRecipientAccountType', type: ETagTypes.MODEL },
        ],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'EscrowRecipientAccountType.recipientAccountType', type: ETagTypes.MODEL }],
        mappingUpdating: [
          { id: uuidv4(), name: 'EscrowRecipientAccountType.recipientAccountType', type: ETagTypes.MODEL },
        ],
      },
      {
        key: uuidv4(),
        nameElement: 'Номер счёта',
        uiComponent: EUiComponents.INPUT_NUMBER,
        availabilityFields: EAvailabilityFields.READ_WRITE,
        logic: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: '-', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'EscrowRecipientAccountType.recipientAccount', type: ETagTypes.MODEL }],
        mappingUpdating: [{ id: uuidv4(), name: 'EscrowRecipientAccountType.recipientAccount', type: ETagTypes.MODEL }],
      },
    ],
  },
  availableTabs: [
    { value: 'generalParameters', label: 'Общие параметры' },
    { value: 'payer', label: 'Плательщик' },
    { value: 'recipient', label: 'Получатель' },
  ],
  activeTab: EFrontendTableTabs.GENERAL_PARAMETERS,
  openTabModal: false,
};

export const frontendTableSlice = createSlice({
  name: 'frontendTableSlice',
  initialState,
  reducers: {
    stateOpenTabModal: (state, action: PayloadAction<boolean>) => {
      state.openTabModal = action.payload;
    },
    addFrontendTableTab: (state, action: PayloadAction<{ tabName: string }>) => {
      const { tabName } = action.payload;
      const nameTableId = uuidv4();
      state.availableTabs.push({ value: nameTableId, label: tabName });
      const newTable = {
        key: uuidv4(),
        nameElement: 'Наименование элемента',
        uiComponent: 'Компонент UI',
        availabilityFields: 'Доступность полей',
        logic: [{ id: uuidv4(), name: 'Логика', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: 'Создание (метод create)', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'Редактирование (метод update)', type: ETagTypes.INPUT }],
        mappingUpdating: [{ id: uuidv4(), name: 'Маппинг при обновлении', type: ETagTypes.INPUT }],
      };
      state.tablesData = { ...state.tablesData, [nameTableId]: [newTable] };
    },
    deleteFrontendTableList: (state, action: PayloadAction<{ tableTabName: EFrontendTableTabs }>) => {
      const { tableTabName } = action.payload;
      const updatedTablesData = { ...state.tablesData };
      delete updatedTablesData[tableTabName];
      const updatedAvailableTabs = state.availableTabs.filter((tab) => tab.value !== tableTabName);

      state.tablesData = updatedTablesData;
      state.availableTabs = updatedAvailableTabs;
      state.activeTab = updatedAvailableTabs.length > 0 ? updatedAvailableTabs[0].value : null;
    },
    updateFrontendTableCell: (
      state,
      action: PayloadAction<{ tableName: string; index: number; dataIndex: string; updateData: string | ITag[] }>
    ) => {
      const { tableName, index, dataIndex, updateData } = action.payload;
      state.tablesData[tableName][index][dataIndex] = updateData;
    },
    addFrontendTableRecord: (state, action: PayloadAction<{ tableName: string }>) => {
      const { tableName } = action.payload;
      state.tablesData[tableName].push({
        key: uuidv4(),
        nameElement: 'Наименование элемента',
        uiComponent: 'Компонент UI',
        availabilityFields: 'Доступность полей',
        logic: [{ id: uuidv4(), name: 'Логика', type: ETagTypes.INPUT }],
        creation: [{ id: uuidv4(), name: 'Создание (метод create)', type: ETagTypes.INPUT }],
        editing: [{ id: uuidv4(), name: 'Редактирование (метод update)', type: ETagTypes.INPUT }],
        mappingUpdating: [{ id: uuidv4(), name: 'Маппинг при обновлении', type: ETagTypes.INPUT }],
      });
    },
    deleteFrontendTableRecord: (state, action: PayloadAction<{ tableName: string; key: string }>) => {
      const { tableName, key } = action.payload;
      state.tablesData[tableName] = state.tablesData[tableName].filter((item) => item.key !== key);
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
  selectors: {
    getActiveTab: (state) => state.activeTab,
    getFrontendTablesData: (state) => state.tablesData,
    getFrontendTableAvailableTabs: (state) => state.availableTabs,
    getStateOpenTabModal: (state) => state.openTabModal,
  },
});

export const { getFrontendTablesData, getFrontendTableAvailableTabs, getActiveTab, getStateOpenTabModal } =
  frontendTableSlice.selectors;
export const {
  stateOpenTabModal,
  addFrontendTableTab,
  deleteFrontendTableList,
  updateFrontendTableCell,
  addFrontendTableRecord,
  deleteFrontendTableRecord,
  setActiveTab,
} = frontendTableSlice.actions;
