import { EditOutlined } from '@ant-design/icons';

import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Flex, Typography } from 'antd';
import {
  EEditTable,
  setDataIndexRecordDragDropEditDrawer,
  setEditTableDragDropEditDrawer,
  setEditTypeDragDropEditDrawer,
  setIndexRecordDragDropEditDrawer,
  setSelectedItemDragDropEditDrawer,
} from 'src/_common/components/DragDropEdit/DragDropEditSlice';
import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import {
  EEditType,
  setDataIndexRecordEditDrawer,
  setEditTableEditDrawer,
  setIndexRecordEditDrawer,
  setInputValueEditDrawer,
  setSelectValueEditDrawer,
} from 'src/_common/components/EditDrawer/EditDrawerSlice';
import { truncateString } from 'src/_common/utils/defaultValuesUtils';
import { useAppDispatch } from 'src/store/hooks/hooks';
import { v4 as uuidv4 } from 'uuid';

export const FrontendTableEditableCell: React.FC<{
  text?: string;
  editType: EEditType;
  index: number;
  dataIndex: string;
  tags?: ITag[];
}> = ({ text = '', editType, index, dataIndex, tags = [] }) => {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    switch (editType) {
      case EEditType.INPUT:
        dispatch(setEditTableEditDrawer(EEditTable.FRONTEND_TABLE));
        dispatch(setInputValueEditDrawer({ inputValue: text, editType }));
        dispatch(setIndexRecordEditDrawer(index));
        dispatch(setDataIndexRecordEditDrawer(dataIndex));
        break;
      case EEditType.SELECT:
        dispatch(setEditTableEditDrawer(EEditTable.FRONTEND_TABLE));
        dispatch(setSelectValueEditDrawer({ selectValue: text, editType }));
        dispatch(setIndexRecordEditDrawer(index));
        dispatch(setDataIndexRecordEditDrawer(dataIndex));
        break;
      case EEditType.DND:
        dispatch(setEditTableDragDropEditDrawer(EEditTable.FRONTEND_TABLE));
        dispatch(setSelectedItemDragDropEditDrawer(tags));
        dispatch(setEditTypeDragDropEditDrawer({ editType }));
        dispatch(setIndexRecordDragDropEditDrawer(index));
        dispatch(setDataIndexRecordDragDropEditDrawer(dataIndex));
        break;
      default:
    }
  };

  return (
    <Flex justify="space-between">
      {text}
      <Typography.Text>
        {tags.map((tag) => (
          <React.Fragment key={uuidv4()}>
            {tag.type === ETagTypes.MODEL && (
              <Link to={`../${truncateString(tag.name)}`} target="_blank">
                {tag.name}
              </Link>
            )}
            {tag.type === ETagTypes.CONDITIONAL && <Typography.Text strong>{tag.name}</Typography.Text>}
            {tag.type === ETagTypes.INPUT && <Typography.Text>{tag.name}</Typography.Text>}
            {tags.length && ' '}
          </React.Fragment>
        ))}
      </Typography.Text>
      <Button icon={<EditOutlined />} size="small" type="link" onClick={handleEdit} />
    </Flex>
  );
};
