import { InfoCircleOutlined } from '@ant-design/icons';

import type React from 'react';

import { Tag, Tooltip } from 'antd';

/**
 * Интерфейс свойств компонента.
 *
 * @property {string} tagText Текст тега.
 * @property {string} hintText Подсказки при наведеннии на тег.
 */
interface IHintTagProps {
  tagText: string;
  hintText: string;
}

/** Кастомный компонент тега со вспдывающей пожсказкой. */
export const HintTag: React.FC<IHintTagProps> = ({ tagText, hintText }) => {
  return (
    <Tooltip placement="rightTop" title={hintText}>
      <Tag
        icon={<InfoCircleOutlined />}
        style={{ display: 'flex', cursor: 'help', borderRadius: 50 }}
        color="blue-inverse"
      >
        {tagText}
      </Tag>
    </Tooltip>
  );
};
