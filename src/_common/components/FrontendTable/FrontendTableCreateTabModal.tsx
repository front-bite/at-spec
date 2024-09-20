import type React from 'react';
import { useEffect, useState } from 'react';

import { Form, Input, Modal } from 'antd';
import {
  addFrontendTableTab,
  getStateOpenTabModal,
  stateOpenTabModal,
} from 'src/_common/components/FrontendTable/FrontendTableSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/hooks';

const initialValues = {
  tabName: 'Новый таб',
};

export const FrontendTableCreateTabModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const openModal = useAppSelector(getStateOpenTabModal);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState<boolean>(false);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const handleCancel = () => {
    dispatch(stateOpenTabModal(false));
    form.setFieldsValue(initialValues);
  };

  const onSumbit = (fields: { tabName: string }) => {
    dispatch(addFrontendTableTab({ tabName: fields.tabName }));
    form.setFieldsValue(initialValues);
    dispatch(stateOpenTabModal(false));
  };

  return (
    <Modal
      title="Создание новой вкладки"
      open={openModal}
      onOk={() => form.submit()}
      okButtonProps={{ size: 'small', disabled: !submittable }}
      cancelButtonProps={{ size: 'small' }}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onSumbit} initialValues={initialValues}>
        <Form.Item
          name="tabName"
          rules={[
            {
              required: true,
              message: `Введите название вкладки`,
            },
          ]}
        >
          <Input placeholder="Название вкладки" size="small" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};
