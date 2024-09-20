import { DeleteOutlined, EditOutlined, HolderOutlined, PlusOutlined } from '@ant-design/icons';

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';

import { Button, Flex, List, Popconfirm, Typography } from 'antd';
import {
  EEditTable,
  setEditTableDragDropEditDrawer,
  setIndexRecordDragDropEditDrawer,
  setSelectedItemDragDropEditDrawer,
} from 'src/_common/components/DragDropEdit/DragDropEditSlice';
import {
  addNewItemToList,
  deleteLoadingScreenFormListItem,
  getListLoadingScreenForm,
  updateListOrder,
} from 'src/_common/components/ListWithConditions/LoadingScreenFormSlice';
import { truncateString } from 'src/_common/utils/defaultValuesUtils';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/hooks';

const { Text } = Typography;

const DraggableItem: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'item',
    drop: (item: { index: number }, monitor) => {
      if (item.index !== index && monitor.isOver()) {
        dispatch(updateListOrder({ draggedIndex: item.index, targetIndex: index }));
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

/** Компонент "Загрузка экранной формы" */
export const LoadingScreenForm = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(getListLoadingScreenForm);

  /**
   * Обработчик редактирования элемента списка.
   * @param {number} index Индекс элемента в списке.
   */
  const handleEdit = (index: number) => {
    dispatch(setEditTableDragDropEditDrawer(EEditTable.LOADING_SCREEN_FORM));
    dispatch(setIndexRecordDragDropEditDrawer(index));
    dispatch(setSelectedItemDragDropEditDrawer(list[index]));
  };

  /**
   * Обработчик удаления элемента из списка.
   * @param {number} index Индекс элемента в списке.
   */
  const handleDelete = (index: number) => {
    dispatch(deleteLoadingScreenFormListItem({ index }));
  };

  /** Обработчик добавления нового элемента в список (массив с тегом). */
  const handleAddNewItemToList = () => {
    dispatch(addNewItemToList());
  };

  return (
    <Flex vertical gap={8}>
      <List
        size="small"
        bordered
        dataSource={list}
        renderItem={(arrayList, index) => (
          <List.Item
            style={{ display: 'flex', alignItems: 'flex-start' }}
            actions={[
              <Button
                title="Редактировать элемент"
                icon={<EditOutlined />}
                size="small"
                key="edit"
                type="link"
                onClick={() => handleEdit(index)}
              />,
              <Popconfirm
                title="Вы уверены, что хотите удалить этот элемент из списка ?"
                onConfirm={() => handleDelete(index)}
                okText="Да"
                cancelText="Нет"
                placement="topLeft"
              >
                <Button type="link" title="Удалить элемент" icon={<DeleteOutlined />} size="small" key="delete" />
              </Popconfirm>,
            ]}
          >
            <Flex gap={8}>
              <DraggableItem index={index}>
                <Button
                  type="link"
                  size="small"
                  icon={<HolderOutlined style={{ cursor: 'grab', fontSize: 18 }} title="Вертикальный Drag&Drop" />}
                />
              </DraggableItem>
              <Typography.Text>
                <span>{index + 1}. </span>
                {arrayList.map((innerArray) => (
                  <React.Fragment key={index}>
                    {innerArray.type === 'MODEL' && (
                      <Link to={`../${truncateString(innerArray.name)}`} target="_blank">
                        {innerArray.name}
                      </Link>
                    )}
                    {innerArray.type === 'CONDITIONAL' && <Text strong>{innerArray.name}</Text>}
                    {innerArray.type !== 'MODEL' && innerArray.type !== 'CONDITIONAL' && <Text>{innerArray.name}</Text>}
                    {index < arrayList.length - 1 && ' '}
                  </React.Fragment>
                ))}
              </Typography.Text>
            </Flex>
          </List.Item>
        )}
      />
      <Button size="small" type="dashed" icon={<PlusOutlined />} onClick={handleAddNewItemToList}>
        Добавить новый элемент списка
      </Button>
    </Flex>
  );
};
