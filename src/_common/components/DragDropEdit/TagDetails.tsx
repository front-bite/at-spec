import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import type { ITag } from 'src/_common/components/DragDropEdit/models';

interface ITagDetailsProps {
  tags: ITag[];
}

const { Text } = Typography;

export const TagDetails: React.FC<ITagDetailsProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, index) => (
        <React.Fragment key={tag.id}>
          {tag.type === 'MODEL' && <Link to="/">{tag.name}</Link>}
          {tag.type === 'CONDITIONAL' && <Text strong>{tag.name}</Text>}
          {tag.type !== 'MODEL' && tag.type !== 'CONDITIONAL' && <Text>{tag.name}</Text>}
          {index !== tags.length - 1 && ' '}
        </React.Fragment>
      ))}
    </>
  );
};
