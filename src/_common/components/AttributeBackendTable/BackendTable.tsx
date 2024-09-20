import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import type React from 'react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Button, Flex, Popconfirm, Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { BackendTableEditableCell } from 'src/_common/components/AttributeBackendTable/BackendTableEditableCell';
import type { IAttributeBackendTableRecord } from 'src/_common/components/AttributeBackendTable/BackendTableSlice';
import {
  addAttributeBackendTableRecord,
  deleteAttributeBackendTableRecord,
  getAttributeBackendTableData,
  setAddAttributeBackendTable,
} from 'src/_common/components/AttributeBackendTable/BackendTableSlice';
import { EEditType } from 'src/_common/components/EditDrawer/EditDrawerSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/hooks';

export const BackendTable: React.FC = () => {
  const tableData = useAppSelector(getAttributeBackendTableData);

  const deleteRow = (key: string) => {
    dispatch(deleteAttributeBackendTableRecord({ key }));
  };

  const handleAddNewRow = () => {
    dispatch(addAttributeBackendTableRecord());
  };

  const columns: ColumnType<IAttributeBackendTableRecord>[] = [
    {
      title: 'Имя атрибута',
      dataIndex: 'attribute',
      width: '15%',
      render: (text, record, index) => (
        <BackendTableEditableCell text={text} editType={EEditType.INPUT} index={index} dataIndex="attribute" />
      ),
    },
    {
      title: 'Наименование',
      dataIndex: 'name',
      width: '15%',
      render: (text, _, index) => (
        <BackendTableEditableCell text={text} editType={EEditType.INPUT} index={index} dataIndex="name" />
      ),
    },
    {
      title: 'Тип данных',
      dataIndex: 'type',
      width: '15%',
      render: (text, _, index) => (
        <BackendTableEditableCell text={text} editType={EEditType.SELECT} index={index} dataIndex="type" />
      ),
    },
    {
      title: 'Обязательность (М/О)',
      width: '5%',
      dataIndex: 'required',
      render: (text, _, index) => (
        <BackendTableEditableCell text={text} editType={EEditType.SELECT} index={index} dataIndex="required" />
      ),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      width: '40%',
      render: (text, _, index) => (
        <BackendTableEditableCell tags={text} editType={EEditType.DND} index={index} dataIndex="description" />
      ),
    },
    {
      width: '1%',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        return (
          <Popconfirm
            title="Вы уверены, что хотите удалить запись ?"
            placement="topRight"
            cancelText="Нет"
            okText="Да"
            onConfirm={() => deleteRow(record.key)}
          >
            <Button title="Удалить элемент" type="link" icon={<DeleteOutlined />} size="small" key="delete" />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Flex gap={8} vertical>
      <Table bordered size="small" pagination={false} dataSource={tableData} columns={columns} />
      <Button size="small" type="dashed" icon={<PlusOutlined />} onClick={handleAddNewRow}>
        Добавить запись
      </Button>
    </Flex>
  );
};
