import type { ISelectOption } from 'src/_common/models/models';

export enum EStdDataModels {
  STRING = 'string',
  BOOLEAN = 'boolean',
  LOCAL_DATE = 'localDate',
  BID_DECIMAL = 'BigDecimal',
  LONG = 'Long',
  LIST = 'List',
}

export enum ERequired {
  M = 'M',
  O = 'O',
}

export enum EUiComponents {
  DATA_PICKER = 'DataPicker',
  RADIO_BUTTON = 'RadioButton',
  INPUT = 'Input',
  INPUT_NUMBER = 'InputNumber',
  SELECT = 'Select',
  DICTIONARY_SELECT = 'DictionarySelect',
  CHECKBOX = 'Checkbox',
}

export enum EAvailabilityFields {
  READ_ONLY = 'readOnly',
  READ_WRITE = 'r/w',
  NO_UI = 'noUI',
}

/** Опции селекта "Тип данных". */
export const STD_DATA_MODELS_OPTIONS: ISelectOption[] = [
  { label: EStdDataModels.STRING, value: EStdDataModels.STRING },
  { label: EStdDataModels.BOOLEAN, value: EStdDataModels.BOOLEAN },
  { label: EStdDataModels.LOCAL_DATE, value: EStdDataModels.LOCAL_DATE },
  { label: EStdDataModels.BID_DECIMAL, value: EStdDataModels.BID_DECIMAL },
  { label: EStdDataModels.LONG, value: EStdDataModels.LONG },
  { label: EStdDataModels.LIST, value: EStdDataModels.LIST },
];

/** Опции селекта "Обязательность (М/О)". */
export const REQUIRED_OPTIONS: ISelectOption[] = [
  { label: ERequired.M, value: ERequired.M },
  { label: ERequired.O, value: ERequired.O },
];

/** Опции селекта "Компонент UI". */
export const UI_COMPONENTS: ISelectOption[] = [
  { label: EUiComponents.DATA_PICKER, value: EUiComponents.DATA_PICKER },
  { label: EUiComponents.RADIO_BUTTON, value: EUiComponents.RADIO_BUTTON },
  { label: EUiComponents.INPUT, value: EUiComponents.INPUT },
  { label: EUiComponents.INPUT_NUMBER, value: EUiComponents.INPUT_NUMBER },
  { label: EUiComponents.SELECT, value: EUiComponents.SELECT },
  { label: EUiComponents.DICTIONARY_SELECT, value: EUiComponents.DICTIONARY_SELECT },
  { label: EUiComponents.CHECKBOX, value: EUiComponents.CHECKBOX },
];

/** Опции селекта "Доступность полей". */
export const AVAILABILITY_FIELDS: ISelectOption[] = [
  { label: EAvailabilityFields.READ_ONLY, value: EAvailabilityFields.READ_ONLY },
  { label: EAvailabilityFields.READ_WRITE, value: EAvailabilityFields.READ_WRITE },
  { label: EAvailabilityFields.NO_UI, value: EAvailabilityFields.NO_UI },
];
