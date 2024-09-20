import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import { v4 as uuidv4 } from 'uuid';

export const TAG_COLOR_STYLES: { [key in ETagTypes]: string } = {
  [ETagTypes.INPUT]: 'default',
  [ETagTypes.MODEL]: 'blue-inverse',
  [ETagTypes.CONDITIONAL]: 'green-inverse',
};

export const CONDITION_TAG_LIST: ITag[] = [
  { id: uuidv4(), name: 'ЕСЛИ', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'ИНАЧЕ', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'И', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'ИЛИ', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'NULL', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'NULL И', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'NULL TO', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'TO', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: '!=', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: '===', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: '+', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'TRUE', type: ETagTypes.CONDITIONAL },
  { id: uuidv4(), name: 'FALSE', type: ETagTypes.CONDITIONAL },
];

export const TEXT_TAG_LIST: ITag[] = [{ id: uuidv4(), name: 'ТЕКСТОВЫЙ ТЭГ', type: ETagTypes.INPUT }];

export const MODEL_DATA_TREE_SELECT = [
  {
    title: 'EscrowPaymentOperation',
    value: 'EscrowPaymentOperation',
    children: [
      {
        title: 'activationDate',
        value: 'EscrowPaymentOperation.activationDate',
      },
      {
        title: 'documentNumber',
        value: 'EscrowPaymentOperation.documentNumber',
      },
      {
        title: 'amount',
        value: 'EscrowPaymentOperation.amount',
      },
      {
        title: 'currencyOperationCode',
        value: 'EscrowPaymentOperation.currencyOperationCode',
      },
      {
        title: 'uip',
        value: 'EscrowPaymentOperation.uip',
      },
      {
        title: 'rate',
        value: 'EscrowPaymentOperation.rate',
      },
      {
        title: 'beneficiary',
        value: 'EscrowPaymentOperation.beneficiary',
      },
      {
        title: 'thirdParty',
        value: 'EscrowPaymentOperation.thirdParty',
      },
      {
        title: 'taxAttributes',
        value: 'EscrowPaymentOperation.taxAttributes',
      },
      {
        title: 'paymentPurpose',
        value: 'EscrowPaymentOperation.paymentPurpose',
      },
      {
        title: 'noProcessing',
        value: 'EscrowPaymentOperation.noProcessing',
      },
    ],
  },
  {
    title: 'CivilEscrowAgreementDeponent',
    value: 'CivilEscrowAgreementDeponent',
    children: [
      {
        title: 'name',
        value: 'CivilEscrowAgreementDeponent.name',
      },
      {
        title: 'escrowAccount',
        value: 'CivilEscrowAgreementDeponent.escrowAccount',
      },
      {
        title: 'taxId',
        value: 'CivilEscrowAgreementDeponent.taxId',
      },
      {
        title: 'kpp',
        value: 'CivilEscrowAgreementDeponent.kpp',
      },
      {
        title: 'ogrn',
        value: 'CivilEscrowAgreementDeponent.ogrn',
      },
      {
        title: 'okopf',
        value: 'CivilEscrowAgreementDeponent.okopf',
      },
      {
        title: 'okved',
        value: 'CivilEscrowAgreementDeponent.okved',
      },
      {
        title: 'legalAddress',
        value: 'CivilEscrowAgreementDeponent.legalAddress',
      },
      {
        title: 'residentCountry',
        value: 'CivilEscrowAgreementDeponent.residentCountry',
      },
      {
        title: 'segment',
        value: 'CivilEscrowAgreementDeponent.segment',
      },
      {
        title: 'firstName',
        value: 'CivilEscrowAgreementDeponent.firstName',
      },
      {
        title: 'middleName',
        value: 'CivilEscrowAgreementDeponent.middleName',
      },
      {
        title: 'lastName',
        value: 'CivilEscrowAgreementDeponent.lastName',
      },
    ],
  },
  {
    title: 'CivilEscrowAgreementBeneficiary',
    value: 'CivilEscrowAgreementBeneficiary',
    children: [
      {
        title: 'name',
        value: 'CivilEscrowAgreementBeneficiary.name',
      },
      {
        title: 'uuid',
        value: 'CivilEscrowAgreementBeneficiary.uuid',
      },
      {
        title: 'executionAccount',
        value: 'CivilEscrowAgreementBeneficiary.executionAccount',
      },
      {
        title: 'accountType',
        value: 'CivilEscrowAgreementBeneficiary.accountType',
      },
      {
        title: 'creditContractNumber',
        value: 'CivilEscrowAgreementBeneficiary.creditContractNumber',
      },
      {
        title: 'firstName',
        value: 'CivilEscrowAgreementBeneficiary.firstName',
      },
      {
        title: 'lastName',
        value: 'CivilEscrowAgreementBeneficiary.lastName',
      },
      {
        title: 'middleName',
        value: 'CivilEscrowAgreementBeneficiary.middleName',
      },
      {
        title: 'registrationAddress',
        value: 'CivilEscrowAgreementBeneficiary.registrationAddress',
      },
      {
        title: 'identityDocument',
        value: 'CivilEscrowAgreementBeneficiary.identityDocument',
      },
    ],
  },
  {
    title: 'EscrowRecipientAccountType',
    value: 'EscrowRecipientAccountType',
    children: [
      {
        title: 'recipientAccountType',
        value: 'EscrowRecipientAccountType.recipientAccountType',
      },
      {
        title: 'recipientAccount',
        value: 'EscrowRecipientAccountType.recipientAccount',
      },
    ],
  },
  {
    title: 'TaxAttributes',
    value: 'TaxAttributes',
    children: [
      {
        title: 'taxDocumentDate',
        value: 'TaxAttributes.taxDocumentDate',
      },
      {
        title: 'taxDocumentNumber',
        value: 'TaxAttributes.taxDocumentNumber',
      },
      {
        title: 'paymentType',
        value: 'TaxAttributes.paymentType',
      },
      {
        title: 'currentTaxDate',
        value: 'TaxAttributes.currentTaxDate',
      },
      {
        title: 'paymentReason',
        value: 'TaxAttributes.paymentReason',
      },
      {
        title: 'taxPayerStatus',
        value: 'TaxAttributes.taxPayerStatus',
      },
      {
        title: 'paymentUpno',
        value: 'TaxAttributes.paymentUpno',
      },
    ],
  },
];
