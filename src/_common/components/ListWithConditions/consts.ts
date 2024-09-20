import type { ITag } from 'src/_common/components/DragDropEdit/models';

export const LOADING_SCREEN_FORM_DATA_LIST: Array<ITag[]> = [
  [
    {
      id: 'bf48573a-55d2-4b12-848c-fea26310700c',
      name: 'Проверить наличие у пользователя прав доступа к данной форме (описание в разделе "Доступ").',
      type: 'INPUT',
    },
  ],
  [
    {
      id: '0b8dcda2-7281-4aea-9f38-d54f5bfca5e0',
      name: 'Вызвать сервис ui/escrow/payment/get.',
      type: 'INPUT',
    },
  ],
  [
    {
      id: 'fb724510-70f3-4faf-a152-15092a68a88a',
      name: 'Заполнить поля формы данными, согласно пункуту "Заполнение экранной формы данными".',
      type: 'INPUT',
    },
  ],
  [
    {
      id: 'a0eb547d-bae3-4d66-a3b8-6ae3f0367b4f',
      name: 'Заполнить атрибут "Назначение платежа" следующим образом:',
      type: 'INPUT',
    },
  ],
  [
    {
      id: 'd502f346-a552-4c83-a096-85f65731123e',
      name: 'ЕСЛИ',
      type: 'CONDITIONAL',
    },
    {
      id: '447e263f-d366-47f1-a761-d9f358758c2c',
      name: 'EscrowPaymentOperation.beneficiary',
      type: 'MODEL',
    },
    {
      id: 'ad1c2aec-e1f2-4eb9-9609-8949973d02cf',
      name: '!=',
      type: 'CONDITIONAL',
    },
    {
      id: 'b671df2a-091f-4483-bb1a-60d4d80fca6b',
      name: 'NULL И',
      type: 'CONDITIONAL',
    },
    {
      id: '491a4578-1aef-4c65-a28a-fd13f664f058',
      name: 'EscrowPaymentOperation.thirdParty',
      type: 'MODEL',
    },
    {
      id: '3b8bab9d-838d-4f5c-be40-ddd3956f5cec',
      name: '!=',
      type: 'CONDITIONAL',
    },
    {
      id: 'ead41e3f-6769-48f6-8920-dcea070e77cf',
      name: 'NULL TO',
      type: 'CONDITIONAL',
    },
    {
      id: '13b29dd4-3ec8-429f-8980-4e04ca44b4d8',
      name: '"Платёж по поручению бенефициара"',
      type: 'INPUT',
    },
    {
      id: 'a24351e1-7cbb-4722-81ca-84689d9b78ed',
      name: 'EscrowPaymentOperation.beneficiary',
      type: 'MODEL',
    },
    {
      id: 'bc90762e-1dde-4b12-bddc-7a83d609cb03',
      name: 'ИЛИ',
      type: 'CONDITIONAL',
    },
    {
      id: '78662214-ee11-408c-a510-1dae1a7ce61c',
      name: 'EscrowPaymentOperation.thirdParty',
      type: 'MODEL',
    },
  ],
  [
    {
      id: '03ca71f0-65d7-4942-bfce-4881c79ca6cc',
      name: 'Вывести блок кредитный договор',
      type: 'INPUT',
    },
    {
      id: '657518c4-9f19-4d8a-bc8a-3dffe66c7c60',
      name: 'ЕСЛИ',
      type: 'CONDITIONAL',
    },
    {
      id: '5992bb15-599a-4696-a58e-dfa3d89f1410',
      name: 'EscrowPaymentOperation.beneficiary',
      type: 'MODEL',
    },
    {
      id: '18f28b8f-7634-4a70-891a-39a565f64944',
      name: '!=',
      type: 'CONDITIONAL',
    },
    {
      id: 'fcf7d0ed-0793-4750-b0fe-6a3bed89656c',
      name: 'NULL И',
      type: 'CONDITIONAL',
    },
    {
      id: '6e564022-9435-493a-bcf1-3750d035c298',
      name: 'EscrowPaymentOperation.thirdParty',
      type: 'MODEL',
    },
    {
      id: '9b1ea9ce-d99a-4234-845e-ee04dc628d6b',
      name: '===',
      type: 'CONDITIONAL',
    },
    {
      id: 'c81bc66e-c618-4c2b-b768-30df142e0abb',
      name: 'NULL',
      type: 'CONDITIONAL',
    },
    {
      id: 'a0cd10dc-19b7-4a1b-b432-1a03e2a0beb9',
      name: 'И',
      type: 'CONDITIONAL',
    },
    {
      id: '94d1bd37-ca68-4d13-b615-de903114401e',
      name: 'EscrowPaymentOperation.paymentPurpose',
      type: 'MODEL',
    },
    {
      id: '6b74924d-dee9-492d-aa53-4974c16404ba',
      name: '!=',
      type: 'CONDITIONAL',
    },
    {
      id: 'b4f3351c-f2de-4a01-b966-e8df3ca57734',
      name: 'NULL',
      type: 'CONDITIONAL',
    },
  ],
];
