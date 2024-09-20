import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import type React from 'react';

import type { TableProps } from 'antd';
import { Button, Flex, Form, Popconfirm, Space, Table } from 'antd';
import { EditableCell } from 'src/_common/components/FormAccessTable/FormAccessTableEditableCell';
import type { IFormAccessTableRow } from 'src/_common/components/FormAccessTable/FormAccessTableSlice';
import {
  addFormAccessTableRow,
  deleteFormAccessTableRow,
  getFormAccessTableData,
  getFormAccessTableEditKey,
  setEditKey,
  updateFormAccessTableRow,
} from 'src/_common/components/FormAccessTable/FormAccessTableSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/hooks';

export const FormAccessTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const tableData = useAppSelector(getFormAccessTableData);
  const editKey = useAppSelector(getFormAccessTableEditKey);
  const isCurrentEditKey = (record: IFormAccessTableRow) => record.key === editKey;
  const isEditing = !!editKey;

  const handleEdit = (record: Partial<IFormAccessTableRow> & { key: React.Key }) => {
    form.setFieldsValue({ actionsOnForm: '', permissionCode: '', ...record });
    dispatch(setEditKey({ key: record.key }));
  };

  const handleCancel = () => {
    dispatch(setEditKey({ key: null }));
  };

  const handleUpdateRow = async (key: string | null) => {
    const row = await form.validateFields();
    dispatch(updateFormAccessTableRow({ key, row }));
  };

  const handleAddNewRow = () => {
    dispatch(addFormAccessTableRow());
  };

  const handleDeleteRow = (key: string | null) => {
    dispatch(deleteFormAccessTableRow({ key }));
  };

  const columns = [
    {
      title: 'Действия на форме',
      dataIndex: 'actionsOnForm',
      width: '35%',
      editable: true,
    },
    {
      title: 'Код права',
      dataIndex: 'permissionCode',
      width: '35%',
      editable: true,
    },
    {
      width: '1%',
      dataIndex: 'operation',
      render: (_: any, record: IFormAccessTableRow) => {
        const editable = isCurrentEditKey(record);
        return editable ? (
          <Flex gap={8}>
            <Button
              title="Принять изменения"
              size="small"
              type="link"
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} onClick={() => handleUpdateRow(record.key)} />}
            />
            <Popconfirm
              title="Есть несохранённые данные, уверены что не хотите отменить ?"
              onConfirm={handleCancel}
              placement="topRight"
              okText="Да"
              cancelText="Нет"
            >
              <Button
                title="Отменить изменения"
                size="small"
                type="link"
                icon={<CloseCircleOutlined style={{ color: '#f50' }} />}
              />
            </Popconfirm>
          </Flex>
        ) : (
          <Space>
            <Button
              type="link"
              title="Редактировать элемент"
              icon={<EditOutlined />}
              size="small"
              disabled={isEditing}
              onClick={() => handleEdit(record)}
            />
            <Popconfirm
              title="Вы уверены, что хотите удалить этот элемент из списка ?"
              onConfirm={() => handleDeleteRow(record.key)}
              placement="topRight"
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="link"
                title="Удалить элемент"
                icon={<DeleteOutlined />}
                size="small"
                disabled={isEditing}
                key="delete"
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns: TableProps<IFormAccessTableRow>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IFormAccessTableRow) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isCurrentEditKey(record),
      }),
    };
  });

  return (
    <Flex vertical gap={8} style={{ width: '40vw' }}>
      <Form form={form} component={false}>
        <Table
          size="small"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={tableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
      <Button size="small" disabled={isEditing} type="dashed" icon={<PlusOutlined />} onClick={handleAddNewRow}>
        Добавить право доступа
      </Button>
    </Flex>
  );
};
