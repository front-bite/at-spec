import type React from 'react';

import { Button, Drawer, Input, Select, Space } from 'antd';
import _ from 'lodash';
import { updateAttributeBackendTableCell } from 'src/_common/components/AttributeBackendTable/BackendTableSlice';
import { EEditTable } from 'src/_common/components/DragDropEdit/DragDropEditSlice';
import {
  AVAILABILITY_FIELDS,
  REQUIRED_OPTIONS,
  STD_DATA_MODELS_OPTIONS,
  UI_COMPONENTS,
} from 'src/_common/components/EditDrawer/EditDrawerConsts';
import {
  EEditType,
  clearEditDrawer,
  getDataIndexRecordEditDrawer,
  getEditTableEditDrawer,
  getEditTypeEditDrawer,
  getIndexRecordEditDrawer,
  getInputValueEditDrawer,
  getSelectValueEditDrawer,
  updateInputValueEditDrawer,
  updateSelectValueEditDrawer,
} from 'src/_common/components/EditDrawer/EditDrawerSlice';
import { getActiveTab, updateFrontendTableCell } from 'src/_common/components/FrontendTable/FrontendTableSlice';
import type { ISelectOption } from 'src/_common/models/models';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/hooks';

export const EditDrawer: React.FC = () => {
  const dispatch = useAppDispatch();

  const activeTab = useAppSelector(getActiveTab);

  const indexRecordEditDrawer = useAppSelector(getIndexRecordEditDrawer);
  const selectValueEditDrawer = useAppSelector(getSelectValueEditDrawer);
  const inputValueEditDrawer = useAppSelector(getInputValueEditDrawer);
  const dataIndexRecordEditDrawer = useAppSelector(getDataIndexRecordEditDrawer);
  const editTypeEditDrawer = useAppSelector(getEditTypeEditDrawer);
  const editTable = useAppSelector(getEditTableEditDrawer);

  const debouncedHandleInputChange = _.debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateInputValueEditDrawer(e.target.value));
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debouncedHandleInputChange(e);
  };

  const handleSelectChange = (selectOption: string) => {
    dispatch(updateSelectValueEditDrawer(selectOption));
  };

  /** Обработчик отмены действия. */
  const handleCancel = () => {
    dispatch(clearEditDrawer());
  };

  const actions = {
    [`${EEditTable.FRONTEND_TABLE}-${EEditType.INPUT}`]: () => {
      dispatch(
        updateFrontendTableCell({
          tableName: activeTab,
          index: indexRecordEditDrawer,
          dataIndex: dataIndexRecordEditDrawer,
          updateData: inputValueEditDrawer,
        })
      );
    },
    [`${EEditTable.FRONTEND_TABLE}-${EEditType.SELECT}`]: () => {
      dispatch(
        updateFrontendTableCell({
          tableName: activeTab,
          index: indexRecordEditDrawer,
          dataIndex: dataIndexRecordEditDrawer,
          updateData: selectValueEditDrawer,
        })
      );
    },
    [`${EEditTable.BACKEND_TABLE}-${EEditType.INPUT}`]: () => {
      dispatch(
        updateAttributeBackendTableCell({
          index: indexRecordEditDrawer,
          dataIndex: dataIndexRecordEditDrawer,
          updateData: inputValueEditDrawer,
        })
      );
    },
    [`${EEditTable.BACKEND_TABLE}-${EEditType.SELECT}`]: () => {
      dispatch(
        updateAttributeBackendTableCell({
          index: indexRecordEditDrawer,
          dataIndex: dataIndexRecordEditDrawer,
          updateData: selectValueEditDrawer,
        })
      );
    },
  };

  const key = `${editTable}-${editTypeEditDrawer}`;

  /** Обработчик сохранения данных. */
  const handleSave = () => {
    actions[key]();
    dispatch(clearEditDrawer());
  };

  const selectDataVariants: { [key in string]: ISelectOption[] } = {
    type: STD_DATA_MODELS_OPTIONS,
    required: REQUIRED_OPTIONS,
    uiComponent: UI_COMPONENTS,
    availabilityFields: AVAILABILITY_FIELDS,
  };

  return (
    <Drawer
      title="Редактирование атрибута"
      extra={
        <Space>
          <Button size="small" onClick={handleCancel}>
            Отмена
          </Button>
          <Button size="small" type="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Space>
      }
      open={indexRecordEditDrawer !== null}
      placement="right"
      closeIcon={false}
    >
      {editTypeEditDrawer === EEditType.INPUT && (
        <Input.TextArea autoSize allowClear defaultValue={inputValueEditDrawer} onChange={handleInputChange} />
      )}
      {editTypeEditDrawer === EEditType.SELECT && (
        <Select
          showSearch
          allowClear
          style={{ width: '100%' }}
          onSelect={handleSelectChange}
          defaultValue={selectValueEditDrawer}
          options={selectDataVariants[dataIndexRecordEditDrawer]}
        />
      )}
    </Drawer>
  );
};
