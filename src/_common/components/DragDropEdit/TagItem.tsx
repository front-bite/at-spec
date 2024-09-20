import { CloseCircleOutlined } from '@ant-design/icons';

import type React from 'react';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Input, Tag, Typography, message } from 'antd';
import _ from 'lodash';
import { changeTagPosition, deleteTag, editInputTag } from 'src/_common/components/DragDropEdit/DragDropEditSlice';
import { TAG_COLOR_STYLES } from 'src/_common/components/DragDropEdit/consts';
import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import { useAppDispatch } from 'src/store/hooks/hooks';

const { Text } = Typography;

const InputStyle: React.CSSProperties = {
  width: 500,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
};

/**
 * Свойства компонента тега.
 * @property {ITag} tag Данные (поля) тега.
 */
interface ITagItemProps {
  tag: ITag;
}

const DraggableTag: React.FC<{ dragTag: ITag; children: React.ReactNode }> = ({ dragTag, children }) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'TAG',
    item: dragTag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TAG',
    drop: (item: ITag, monitor) => {
      if (item.id !== dragTag.id && monitor.isOver()) {
        dispatch(changeTagPosition({ fromId: item.id, toId: dragTag.id }));
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

/** Компонент тега. */
export const TagItem: React.FC<ITagItemProps> = ({ tag }) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  /** Обработчик удаления тега из Drag&Drop по идентификатору. */
  const handleDeleteTag = () => {
    dispatch(deleteTag(tag.id));
  };

  /** Обработчик переключения тега в режим редактирования с помощью двойного клика. */
  const handleEditDoubleClick = () => {
    if (tag.type === ETagTypes.INPUT) {
      setEditMode(true);
    } else {
      message.warning(
        <Text>
          Тэг <Tag color={TAG_COLOR_STYLES[tag.type]}>{tag.name}</Tag>не редактируемый
        </Text>
      );
    }
  };

  const debouncedHandleChange = _.debounce((newName: string) => {
    dispatch(editInputTag({ tagId: tag.id, newName }));
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedHandleChange(e.target.value);
  };

  const handleBlur = () => {
    setEditMode(false);
    if (tag.type !== ETagTypes.INPUT) {
      dispatch(changeTagPosition({ fromId: tag.id, toId: tag.name }));
    }
    dispatch(editInputTag({ tagId: tag.id, newName: tag.name }));
  };

  const handlePressEnter = () => {
    setEditMode(false);
    if (tag.type !== ETagTypes.INPUT) {
      dispatch(changeTagPosition({ fromId: tag.id, toId: tag.name }));
    }
    dispatch(editInputTag({ tagId: tag.id, newName: tag.name }));
  };

  return (
    <DraggableTag dragTag={tag}>
      {editMode && tag.type === ETagTypes.INPUT ? (
        <Input
          allowClear
          style={InputStyle}
          size="small"
          defaultValue={tag.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onPressEnter={handlePressEnter}
        />
      ) : (
        <Tag
          style={{ cursor: 'grab' }}
          color={TAG_COLOR_STYLES[tag.type]}
          closeIcon={<CloseCircleOutlined />}
          onClose={handleDeleteTag}
          onDoubleClick={handleEditDoubleClick}
        >
          <span style={{ whiteSpace: 'pre-wrap' }}>{tag.name}</span>
        </Tag>
      )}
    </DraggableTag>
  );
};
