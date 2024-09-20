import { ClearOutlined } from '@ant-design/icons';

import type React from 'react';

import { Button, Card, Col, Drawer, Empty, Flex, Row, Space, Tag, Typography, message } from 'antd';
import { updateAttributeBackendTableCell } from 'src/_common/components/AttributeBackendTable/BackendTableSlice';
import {
  EEditTable,
  clearAllDragDrop,
  clearDragDropField,
  createConditionalAndInputTag,
  createModelTag,
  getDataIndexRecordDragDropEditDrawer,
  getEditTableDragDropEditDrawer,
  getSelectedItemEdit,
  getindexRecordDragDropEditDrawer,
} from 'src/_common/components/DragDropEdit/DragDropEditSlice';
import { FindModelTreeSelect } from 'src/_common/components/DragDropEdit/FindModelTreeSelect';
import { TagDetails } from 'src/_common/components/DragDropEdit/TagDetails';
import { TagItem } from 'src/_common/components/DragDropEdit/TagItem';
import { CONDITION_TAG_LIST, TEXT_TAG_LIST } from 'src/_common/components/DragDropEdit/consts';
import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { getActiveTab, updateFrontendTableCell } from 'src/_common/components/FrontendTable/FrontendTableSlice';
import { updateLoadingScreenFormListItem } from 'src/_common/components/ListWithConditions/LoadingScreenFormSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks/hooks';

const { Text } = Typography;

/** Компонент редактирования с помощью Drag&Drop. */
export const DragDropEditDrawer: React.FC = () => {
  const dispatch = useAppDispatch();

  const activeTab = useAppSelector(getActiveTab);

  const tags = useAppSelector(getSelectedItemEdit);
  const selectedItemDragDropEditDrawer = useAppSelector(getSelectedItemEdit);
  const indexRecordDragDropEditDrawer = useAppSelector(getindexRecordDragDropEditDrawer);
  const dataIndexRecordDragDropEditDrawer = useAppSelector(getDataIndexRecordDragDropEditDrawer);
  const editTable = useAppSelector(getEditTableDragDropEditDrawer);

  /** Обработчик отмены действия. */
  const handleCancel = () => {
    dispatch(clearAllDragDrop());
  };

  /** Обработчик сохранения данных. */
  const handleSave = () => {
    if (selectedItemDragDropEditDrawer.length) {
      if (editTable === EEditTable.LOADING_SCREEN_FORM) {
        dispatch(updateLoadingScreenFormListItem({ selectedItemDragDropEditDrawer, indexRecordDragDropEditDrawer }));
      }
      if (editTable === EEditTable.FRONTEND_TABLE) {
        dispatch(
          updateFrontendTableCell({
            tableName: activeTab,
            index: indexRecordDragDropEditDrawer,
            dataIndex: dataIndexRecordDragDropEditDrawer,
            updateData: selectedItemDragDropEditDrawer,
          })
        );
      }
      if (editTable === EEditTable.BACKEND_TABLE) {
        dispatch(
          updateAttributeBackendTableCell({
            index: indexRecordDragDropEditDrawer,
            dataIndex: dataIndexRecordDragDropEditDrawer,
            updateData: selectedItemDragDropEditDrawer,
          })
        );
      }
      dispatch(clearAllDragDrop());
      message.success('Данные успешно сохранены');
    } else {
      message.error(
        'Вы стёрли имеющиеся данные не добавив новые. Добавьте данные или вернитесь на шаг назад и удалите строку.',
        5
      );
    }
  };

  /**
   * Обрабатывает событие клика на теге, создавая новый тег с уникальным идентификатором.
   *
   * @param {ITag} clickedTag Тег, по которому был произведен клик.
   */
  const handleTagClick = (clickedTag: ITag) => {
    dispatch(createConditionalAndInputTag(clickedTag));
  };

  /**
   * Обрабатывает событие изменения выбранного значения в древовидном селекторе, добавляя новый тег в массив тегов.
   *
   * @param {string} treeSelectValue Выбранное значение в древовидном селекторе.
   */
  const handleTreeSelectChange = (treeSelectValue: string) => {
    dispatch(createModelTag(treeSelectValue));
  };

  const handleClearDragDropField = () => {
    dispatch(clearDragDropField());
  };

  return (
    <Drawer
      title="Drag&Drop редактирование"
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
      placement="top"
      size="large"
      closeIcon={false}
      open={indexRecordDragDropEditDrawer !== null}
      footer={
        <Flex vertical>
          <Card size="small" title="Набор компонентов">
            <Space direction="vertical">
              <Flex gap={6} vertical>
                <Text type="secondary">Теги условий (нередактируемые)</Text>
                <Flex wrap>
                  {CONDITION_TAG_LIST.map((tag) => (
                    <Tag
                      key={tag.id}
                      color="green-inverse"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag.name}
                    </Tag>
                  ))}
                </Flex>
              </Flex>
              <Flex gap={6} vertical>
                <Text type="secondary">Текстовые теги (редактируемые)</Text>
                <Flex wrap>
                  {TEXT_TAG_LIST.map((tag) => (
                    <Tag key={tag.id} style={{ cursor: 'pointer' }} onClick={() => handleTagClick(tag)}>
                      {tag.name}
                    </Tag>
                  ))}
                </Flex>
              </Flex>
              <Flex gap={6} vertical>
                <Text type="secondary">Теги моделей данных (нередактируемые)</Text>
                <Flex>
                  <FindModelTreeSelect onSelectChange={handleTreeSelectChange} />
                </Flex>
              </Flex>
            </Space>
          </Card>
        </Flex>
      }
    >
      <Row gutter={8}>
        <Col span={12}>
          <Card
            size="small"
            title="Drag&Drop компоновка для строки"
            extra={
              <Button
                type="link"
                size="small"
                title="Быстрая очистка Drag&Drop"
                disabled={!tags.length}
                onClick={handleClearDragDropField}
                icon={<ClearOutlined />}
              />
            }
          >
            {tags.length ? (
              <Flex gap="4px 0" wrap>
                {tags.map((tag) => (
                  <TagItem key={tag.id} tag={tag} />
                ))}
              </Flex>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Добавьте компоненты" />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Итоговый результат">
            {tags.length ? (
              <TagDetails tags={tags} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Drag&Drop компоновка пуста" />
            )}
          </Card>
        </Col>
      </Row>
    </Drawer>
  );
};
