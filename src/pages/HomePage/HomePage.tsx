import { AliwangwangOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Flex, Tag } from 'antd';
import { TAG_COLOR_STYLES } from 'src/_common/components/DragDropEdit/consts';
import type { ITag } from 'src/_common/components/DragDropEdit/models';
import { ETagTypes } from 'src/_common/components/DragDropEdit/models';
import { v4 as uuidv4 } from 'uuid';

import carriage from '../../assets/svg/carriage.svg';
import logoLarge from '../../assets/svg/logo-large.svg';

import styles from './HomePage.module.css';

const DraggableTag: React.FC<{
  tags: ITag[];
  dragTag: ITag;
  children: React.ReactNode;
  setTags: (tags: ITag[]) => void;
}> = ({ tags, dragTag, children, setTags }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TAG',
    item: dragTag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TAG',
    hover: (item: ITag) => {
      if (item.id !== dragTag.id) {
        const dragIndex = tags.findIndex((t) => t.id === dragTag.id);
        const hoverIndex = tags.findIndex((t) => t.id === item.id);
        if (dragIndex === -1 || hoverIndex === -1) return;

        const updatedTags = [...tags];
        const draggedTag = updatedTags[dragIndex];
        updatedTags[dragIndex] = updatedTags[hoverIndex];
        updatedTags[hoverIndex] = draggedTag;

        setTags(updatedTags);
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export const HomePage = () => {
  const [tags, setTags] = useState<ITag[]>([
    { id: uuidv4(), name: 'быстро', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'и', type: ETagTypes.CONDITIONAL },
    { id: uuidv4(), name: 'легко', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'строй', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'нужные', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'условия', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'или', type: ETagTypes.CONDITIONAL },
    { id: uuidv4(), name: 'двигай', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'модели данных', type: ETagTypes.MODEL },
    { id: uuidv4(), name: 'с помощью', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'drag & drop', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'и', type: ETagTypes.CONDITIONAL },
    { id: uuidv4(), name: 'редактируй', type: ETagTypes.INPUT },
    { id: uuidv4(), name: 'текст', type: ETagTypes.INPUT },
  ]);

  return (
    <div className={styles.container}>
      <Flex gap={60} vertical align="center">
        <Flex gap={20} align="end">
          <img src={logoLarge} />
          <img className={styles.fadeInAnimation} src={carriage} />
        </Flex>
        <div style={{ width: 610, borderRadius: 20, background: 'none' }}>
          <Flex gap="6px 0px" wrap>
            {tags.map((tag) => (
              <DraggableTag tags={tags} dragTag={tag} setTags={setTags}>
                <Tag
                  color={TAG_COLOR_STYLES[tag.type]}
                  style={{
                    cursor: 'grab',
                    width: 132,
                    borderRadius: 12,
                    textAlign: 'center',
                    fontSize: 14,
                    lineHeight: 2,
                    fontWeight: tag.name === 'drag & drop' ? 500 : 400,
                    border: tag.name === 'drag & drop' ? '1px solid #1677FF' : '1px solid #D9D9D9',
                  }}
                >
                  {tag.name}
                </Tag>
              </DraggableTag>
            ))}
          </Flex>
        </div>
      </Flex>
    </div>
  );
};
