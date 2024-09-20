import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import type React from 'react';

import { Button, Flex, Popconfirm, Table, Tabs } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { EEditType } from 'src/_common/components/EditDrawer/EditDrawerSlice';
import { FrontendTableCreateTabModal } from 'src/_common/components/FrontendTable/FrontendTableCreateTabModal';
import { FrontendTableEditableCell } from 'src/_common/components/FrontendTable/FrontendTableEditableCell';
import type { IFrontendTableRecord } from 'src/_common/components/FrontendTable/FrontendTableSlice';
import {
  EFrontendTableTabs,
  addFrontendTableRecord,
  deleteFrontendTableList,
  deleteFrontendTableRecord,
  getActiveTab,
  getFrontendTableAvailableTabs,
  getFrontendTablesData,
  setActiveTab,
  stateOpenTabModal,
} from 'src/_common/components/FrontendTable/FrontendTableSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/hooks';

interface ICustomColumnType<T> extends ColumnType<T> {
  children?: ICustomColumnType<T>[];
}

enum EEditTabTypes {
  ADD = 'add',
  REMOVE = 'remove',
}

export const FrontendTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const deleteRow = (key: string) => {
    dispatch(deleteFrontendTableRecord({ tableName: activeTab, key }));
  };

  const columns: ICustomColumnType<IFrontendTableRecord>[] = [
    {
      title: 'Наименование элемента',
      dataIndex: 'nameElement',
      render: (text, _, index) => (
        <FrontendTableEditableCell text={text} editType={EEditType.INPUT} index={index} dataIndex="nameElement" />
      ),
    },
    {
      title: 'Компонент UI',
      dataIndex: 'uiComponent',
      render: (text, _, index) => (
        <FrontendTableEditableCell text={text} editType={EEditType.SELECT} index={index} dataIndex="uiComponent" />
      ),
    },
    {
      title: 'Доступность полей',
      dataIndex: 'availabilityFields',
      render: (text, _, index) => (
        <FrontendTableEditableCell
          text={text}
          editType={EEditType.SELECT}
          index={index}
          dataIndex="availabilityFields"
        />
      ),
    },
    {
      title: 'Логика',
      dataIndex: 'logic',
      render: (text, _, index) => (
        <FrontendTableEditableCell tags={text} editType={EEditType.DND} index={index} dataIndex="logic" />
      ),
    },
    {
      title: 'Правило заполнения',
      dataIndex: 'fillingRule',
      children: [
        {
          title: 'Создание (метод create)',
          dataIndex: 'creation',
          render: (text, _, index) => (
            <FrontendTableEditableCell tags={text} editType={EEditType.DND} index={index} dataIndex="creation" />
          ),
        },
        {
          title: 'Редактирование (метод update)',
          dataIndex: 'editing',
          render: (text, _, index) => (
            <FrontendTableEditableCell tags={text} editType={EEditType.DND} index={index} dataIndex="editing" />
          ),
        },
      ],
    },
    {
      title: 'Сохранение (метод create)',
      dataIndex: 'saving',
      children: [
        {
          title: 'Маппинг при обновлении',
          dataIndex: 'mappingUpdating',
          render: (text, _, index) => (
            <FrontendTableEditableCell tags={text} editType={EEditType.DND} index={index} dataIndex="mappingUpdating" />
          ),
        },
      ],
    },
    {
      width: '1%',
      dataIndex: 'operation',
      render: (value, record) => {
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

  const availableTabs = useAppSelector(getFrontendTableAvailableTabs);
  const tablesData = useAppSelector(getFrontendTablesData);
  const activeTab = useAppSelector(getActiveTab);

  const tabData: { [key: string]: IFrontendTableRecord[] } = Object.fromEntries(
    Object.entries(tablesData).map(([key, value]) => [key, value])
  );

  const handleTabChange = (key: string) => {
    dispatch(setActiveTab(key));
  };

  /** Добавление новой записи в таблицу. */
  const handleAddNewRow = () => {
    dispatch(addFrontendTableRecord({ tableName: activeTab as EFrontendTableTabs }));
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: EEditTabTypes) => {
    if (action === EEditTabTypes.ADD) {
      dispatch(stateOpenTabModal(true));
    }
    if (action === EEditTabTypes.REMOVE) {
      dispatch(deleteFrontendTableList({ tableTabName: targetKey as EFrontendTableTabs }));
    }
  };

  return (
    <>
      <Tabs
        size="small"
        type="editable-card"
        activeKey={activeTab}
        onEdit={onEdit}
        onChange={(key) => handleTabChange(key as EFrontendTableTabs)}
        items={availableTabs?.map((name) => {
          const isClosable = [
            EFrontendTableTabs.GENERAL_PARAMETERS,
            EFrontendTableTabs.PAYER,
            EFrontendTableTabs.RECIPIENT,
          ].includes(name.value as EFrontendTableTabs);

          return {
            label: name.label,
            key: name.value,
            closable: !isClosable,
            children: (
              <Flex gap={8} vertical>
                <Table
                  bordered
                  size="small"
                  pagination={false}
                  dataSource={tabData[name.value as EFrontendTableTabs]}
                  columns={columns}
                />
                <Button size="small" type="dashed" icon={<PlusOutlined />} onClick={handleAddNewRow}>
                  Добавить запись
                </Button>
              </Flex>
            ),
          };
        })}
      />
      <FrontendTableCreateTabModal />
    </>
  );
};
